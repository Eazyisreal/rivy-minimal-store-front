import api from "./axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
  brandId: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  min?: number;
  max?: number;
  page?: number;
  limit?: number;
}

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await api.get("/products", { params: filters });
      return data.data;
    },
  });
};
