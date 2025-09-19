import api from "./axios";
import { useQuery } from "@tanstack/react-query";

export interface Brand {
  id: string;
  name: string;
}

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await api.get("/brands");
      return data.data;
    },
  });
};
