import Product from '../models/product';
import { prepareOrderItems } from '../utils/checkoutUtils';

jest.mock('../models/product');

describe('prepareOrderItems', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns orderItemsData and validationErrors correctly', async () => {
    const mockProducts: any = {
      'p1': { id: 'p1', name: 'Product 1', stock: 5, price: 10 },
      'p2': { id: 'p2', name: 'Product 2', stock: 0, price: 20 },
    };

    (Product.findByPk as jest.Mock).mockImplementation((id: string) => mockProducts[id] || null);

    const items = [
      { productId: 'p1', quantity: 3 },
      { productId: 'p2', quantity: 1 },
      { productId: 'p3', quantity: 1 },
    ];

    const { orderItemsData, validationErrors } = await prepareOrderItems(items);

    expect(orderItemsData.length).toBe(1);
    expect(orderItemsData[0]).toMatchObject({
      productId: 'p1',
      quantity: 3,
      price: 10,
      unitPrice: 10,
      productName: 'Product 1'
    });

    expect(validationErrors).toEqual([
      'Insufficient stock for Product 2. Available: 0, Requested: 1',
      'Product p3 not found'
    ]);
  });
});
