import api from "./axios";
import { useMutation } from "@tanstack/react-query";

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutRequest {
  items: CheckoutItem[];
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
}

export interface CheckoutResponse {
  success: boolean;
  data: {
    orderId: string;
    orderNumber: string;
    total: number;
    status: string;
    estimatedDelivery: string;
    paymentResult: {
      success: boolean;
      paymentId?: string;
      message?: string;
    };
    customerInfo: {
      email: string;
      name: string;
    };
    itemCount: number;
  };
  message: string;
}

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (checkoutData: CheckoutRequest): Promise<CheckoutResponse> => {
      const { data } = await api.post("/checkout", checkoutData);
      return data;
    },
  });
};