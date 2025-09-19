import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().uuid("Invalid product ID format"),
  quantity: z.number().int().min(1, "Quantity must be at least 1")
});

export const customerInfoSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  phone: z.string().optional()
});

export const shippingAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required").default("US")
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "At least one item is required"),
  customerInfo: customerInfoSchema,
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer"], {
    message: "Invalid payment method" 
  })
});

export type CheckoutRequest = z.infer<typeof checkoutSchema>;