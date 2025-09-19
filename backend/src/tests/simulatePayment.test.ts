import { simulatePayment } from '../utils/checkoutUtils';

describe('simulatePayment', () => {
  it('returns success/failure object with correct structure', async () => {
    const result = await simulatePayment('credit_card', 100);

    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('paymentId');
    expect(result).toHaveProperty('method', 'credit_card');
    expect(result).toHaveProperty('amount', 100);
    expect(result).toHaveProperty('processedAt');
    expect(result).toHaveProperty('message');
  });

  it('returns failure message for unknown method', async () => {
    const result = await simulatePayment('unknown_method' as any, 50);
    if (!result.success) {
      expect(result.message).toBe('Payment processing failed. Please try again.');
    }
  });
});
