import { calculateTotals } from '../utils/checkoutUtils';

describe('calculateTotals', () => {
  it('calculates subtotal, tax, shipping, and total correctly', () => {
    const items = [
      { price: 50, quantity: 2 },
      { price: 25, quantity: 1 },
    ];

    const result = calculateTotals(items);

    expect(result.subtotal).toBe(125);
    expect(result.tax).toBe(10);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(135);
  });

  it('applies standard shipping if subtotal < 100', () => {
    const items = [{ price: 20, quantity: 2 }];
    const result = calculateTotals(items);

    expect(result.subtotal).toBe(40);
    expect(result.tax).toBe(3.2);
    expect(result.shipping).toBe(10);
    expect(result.total).toBe(53.2);
  });

  it('throws error for invalid price', () => {
    const items = [{ price: -5, quantity: 2 }];
    expect(() => calculateTotals(items)).toThrow('Invalid price value: -5');
  });
});
