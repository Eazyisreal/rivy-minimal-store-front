import { z } from 'zod';

export const orderTrackingSchema = z.object({
  id: z.string().uuid('Invalid order ID format')
});