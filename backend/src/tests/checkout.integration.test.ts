import { FindOptions, Identifier, Model } from 'sequelize';
import { calculateTotals, decrementProductStock, prepareOrderItems, simulatePayment } from '../utils/checkoutUtils';

import Order from '../models/order';
import OrderItem from '../models/orderItem';
import Product from '../models/product';
import app from '../app';
import request from 'supertest';

jest.mock('../models/product', () => {
  class MockProduct extends Model {
    static findByPk = jest.fn();
    static decrement = jest.fn();
    static hasMany = jest.fn();
    static belongsTo = jest.fn();
  }
  return MockProduct;
});

jest.mock('../models/order', () => {
  class MockOrder extends Model {
    static create = jest.fn();
    static findByPk = jest.fn();
    static hasMany = jest.fn();
  }
  return MockOrder;
});

jest.mock('../models/orderItem', () => {
  class MockOrderItem extends Model {
    static create = jest.fn();
    static findByPk = jest.fn();
    static belongsTo = jest.fn();
  }
  return MockOrderItem;
});

jest.mock('../utils/checkoutUtils', () => ({
  prepareOrderItems: jest.fn(),
  calculateTotals: jest.fn(),
  decrementProductStock: jest.fn(),
  simulatePayment: jest.fn(),
}));



const mockedProduct = Product as any;
const mockedOrder = Order as any;
const mockedOrderItem = OrderItem as any;
const mockedPrepareOrderItems = prepareOrderItems as jest.MockedFunction<typeof prepareOrderItems>;
const mockedCalculateTotals = calculateTotals as jest.MockedFunction<typeof calculateTotals>;
const mockedDecrementProductStock = decrementProductStock as jest.MockedFunction<typeof decrementProductStock>;
const mockedPayment = simulatePayment as jest.MockedFunction<typeof simulatePayment>;

const mockFindByPk = async (
  identifier?: Identifier,
  options?: Omit<FindOptions, 'where'>
): Promise<Model | null> => {
  class MockProduct extends Model {}
  
  const idStr = identifier instanceof Buffer ? identifier.toString() : identifier;

  if (idStr === '550e8400-e29b-41d4-a716-446655440001') 
    return new MockProduct({ id: '550e8400-e29b-41d4-a716-446655440001', name: 'Product 1', price: 50, stock: 10 }) as any;
  if (idStr === '550e8400-e29b-41d4-a716-446655440002') 
    return new MockProduct({ id: '550e8400-e29b-41d4-a716-446655440002', name: 'Product 2', price: 30, stock: 5 }) as any;
  return null;
};

beforeEach(() => {
  jest.clearAllMocks();

  mockedProduct.findByPk.mockImplementation(mockFindByPk);
  mockedProduct.decrement = jest.fn().mockResolvedValue([1]);

  mockedOrder.create.mockImplementation(async (data: any) => ({ 
    id: 'order1', 
    orderNumber: data.orderNumber || 'ORD-123456789-ABCD',
    ...data 
  }) as any);
  
  mockedOrderItem.create.mockImplementation(async (data: any) => ({ id: 'orderitem1', ...data }) as any);

  mockedPrepareOrderItems.mockImplementation(async (items: any[]) => {
    const orderItemsData: any[] = [];
    const validationErrors: string[] = [];

    for (const item of items) {
      if (item.productId === '550e8400-e29b-41d4-a716-446655440001') {
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: 50,
          product: { id: item.productId, name: 'Product 1', price: 50, stock: 10 }
        });
      } else if (item.productId === '550e8400-e29b-41d4-a716-446655440002') {
        if (item.quantity > 5) {
          validationErrors.push(`Insufficient stock for product Product 2. Available: 5, Requested: ${item.quantity}`);
        } else {
          orderItemsData.push({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: 30,
            product: { id: item.productId, name: 'Product 2', price: 30, stock: 5 }
          });
        }
      } else {
        validationErrors.push(`Product with ID ${item.productId} not found`);
      }
    }

    return { orderItemsData, validationErrors };
  });

  mockedCalculateTotals.mockImplementation((orderItemsData: any[]) => {
    const subtotal = orderItemsData.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2))
    };
  });

  mockedDecrementProductStock.mockResolvedValue(undefined);

  mockedPayment.mockImplementation(async (method: string, amount: number) => ({
    success: method === 'credit_card',
    paymentId: method === 'credit_card' ? 'test_payment_id' : null,
    method,
    amount,
    processedAt: new Date().toISOString(),
    message: method === 'credit_card'
      ? `Payment of $${amount} processed successfully via ${method}`
      : 'Payment failed',
  }));
});

describe('POST /api/v1/checkout', () => {
  it('should create an order successfully', async () => {
    const payload = {
      items: [
        { productId: '550e8400-e29b-41d4-a716-446655440001', quantity: 2 },
        { productId: '550e8400-e29b-41d4-a716-446655440002', quantity: 1 },
      ],
      customerInfo: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1-555-123-4567',
      },
      shippingAddress: {
        street: '1234 Elm Street, Apt 5B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
      },
      paymentMethod: 'credit_card',
    };

    const res = await request(app).post('/api/v1/checkout').send(payload);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Order placed successfully');
    expect(res.body.data.orderId).toBeDefined();
    expect(res.body.data.total).toBeGreaterThan(0);

    expect(mockedPrepareOrderItems).toHaveBeenCalledWith(payload.items);
    expect(mockedPayment).toHaveBeenCalledWith('credit_card', expect.any(Number));
    expect(mockedOrder.create).toHaveBeenCalled();
    expect(mockedOrderItem.create).toHaveBeenCalledTimes(2);
    expect(mockedDecrementProductStock).toHaveBeenCalled();
  });

  it('should fail if product stock is insufficient', async () => {
    const payload = {
      items: [{ productId: '550e8400-e29b-41d4-a716-446655440002', quantity: 10 }],
      customerInfo: { email: 'test@example.com', firstName: 'John', lastName: 'Doe' },
      shippingAddress: { street: '123 St', city: 'NY', state: 'NY', zipCode: '10001', country: 'US' },
      paymentMethod: 'credit_card',
    };

    const res = await request(app).post('/api/v1/checkout').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Product validation failed');
    expect(res.body.errors.errors[0]).toMatch(/Insufficient stock/);

    expect(mockedPayment).not.toHaveBeenCalled();
  });

  it('should fail if payment fails', async () => {
    mockedPayment.mockImplementationOnce(async (method: string, amount: number) => ({
      success: false,
      paymentId: null,
      method,
      amount,
      processedAt: new Date().toISOString(),
      message: 'Payment failed',
    }));
    
    const payload = {
      items: [{ productId: '550e8400-e29b-41d4-a716-446655440001', quantity: 1 }],
      customerInfo: { email: 'payfail@example.com', firstName: 'Jane', lastName: 'Doe' },
      shippingAddress: { street: '123 St', city: 'NY', state: 'NY', zipCode: '10001', country: 'US' },
      paymentMethod: 'credit_card',
    };

    const res = await request(app).post('/api/v1/checkout').send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Payment processing failed');
    expect(res.body.errors.success).toBe(false);

    expect(mockedDecrementProductStock).not.toHaveBeenCalled();
  });

  it('should fail Zod validation for invalid payload', async () => {
    const invalidPayload = {
      customerInfo: { email: 'bademail' }, 
      shippingAddress: {},
      paymentMethod: 'credit_card',
    };

    const res = await request(app).post('/api/v1/checkout').send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation failed');
    expect(res.body.errors.errors[0].field).toBeDefined();
  });
});