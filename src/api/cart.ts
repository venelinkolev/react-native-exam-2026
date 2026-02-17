import apiClient from "./apiClient";
import { getToken } from "../utils/storage";
import {
    CartItemAPI,
    AddToCartRequest,
    GetCartRequest,
    UpdateCartRequest,
    DeleteCartRequest,
} from "../types/cart.types";

const getAuthHeader = async () => {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCart = async (data: GetCartRequest): Promise<CartItemAPI[]> => {
    const token = await getToken();

    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/cart?sessionID=${data.sessionID}&customerID=${data.customerID}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const result = await response.json();

    if (!result?.success || !Array.isArray(result?.items)) return [];
    return result.items;
};

export const addToCart = async (data: AddToCartRequest): Promise<void> => {
    const headers = await getAuthHeader();
    await apiClient.post("/cart", data, { headers });
};

export const updateCartItem = async (data: UpdateCartRequest): Promise<void> => {
    const headers = await getAuthHeader();
    await apiClient.put("/cart", data, { headers });
};

export const deleteCartItem = async (data: DeleteCartRequest): Promise<void> => {
    const headers = await getAuthHeader();
    await apiClient.delete("/cart", {
        headers,
        data: { id: data.id },
    });
};