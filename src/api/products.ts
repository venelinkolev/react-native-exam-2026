import apiClient from "./apiClient";
import { ProductParam } from "../types/product.types";

export const fetchProducts = async (): Promise<ProductParam[]> => {
    const response = await apiClient.post<ProductParam[]>("/getstockslite", {
        includepricelist: true,
        last_change_date: "",
        stock_list: [],
        customerID: 0,
        warehouse_id: 0,
    });
    return response.data;
};