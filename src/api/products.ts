import apiClient from "./apiClient";
import { getToken } from "../utils/storage";
import { ProductAPI, ProductParam } from "../types/product.types";

const mapProduct = (item: ProductAPI): ProductParam => ({
    id: item.stk_idnumb,
    stockID: item.stk_idnumb,
    name: item.stk_name,
    price: item.price ?? item.basic_price,
    description: item.description || undefined,
    imageUrl: item.image ? `data:image/jpeg;base64,${item.image}` : undefined,
    category: item.gr_id ? `Група ${item.gr_id}` : undefined,
});

export const fetchProducts = async (): Promise<ProductParam[]> => {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await apiClient.post("/getstockslite", {
        get_pictures: true,
        includepricelist: true,
        last_change_date: "",
        stock_list: [],
        customerID: 0,
        warehouse_id: 0,
    }, { headers });

    const result = response.data;
    if (Array.isArray(result?.items)) return result.items.map(mapProduct);
    return [];
};