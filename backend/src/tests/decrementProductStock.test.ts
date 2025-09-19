import Product from '../models/product';
import { decrementProductStock } from '../utils/checkoutUtils';

jest.mock('../models/product');

describe('decrementProductStock', () => {
  it('calls Product.decrement with correct arguments', async () => {
    (Product.decrement as jest.Mock) = jest.fn().mockResolvedValue(true);

    const orderItems = [
      { productId: 'p1', quantity: 3 },
      { productId: 'p2', quantity: 2 },
    ];

    await decrementProductStock(orderItems);

    expect(Product.decrement).toHaveBeenCalledTimes(2);
    expect(Product.decrement).toHaveBeenCalledWith('stock', { by: 3, where: { id: 'p1' } });
    expect(Product.decrement).toHaveBeenCalledWith('stock', { by: 2, where: { id: 'p2' } });
  });
});
