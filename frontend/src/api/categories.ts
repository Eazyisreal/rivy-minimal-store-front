import api from "./axios";
import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data.data;
    },
  });
};
