import api from "./axios";
import { useQuery } from "@tanstack/react-query";

export interface OrderItem {
  name: any;
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface Order {
  id: string;
  total: string;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  userId: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      const orders: Order[] = data.data;
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data.data as Order;
    },
    enabled: !!id,
  });
};