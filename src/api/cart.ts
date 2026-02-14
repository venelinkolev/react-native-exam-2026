import apiClient from "./apiClient";
import {
    CartItemAPI,
    AddToCartRequest,
    GetCartRequest,
    UpdateCartRequest,
    DeleteCartRequest,
} from "../types/cart.types";

// GET — fetch cart items
export const getCart = async (data: GetCartRequest): Promise<CartItemAPI[]> => {
    const response = await apiClient.get<CartItemAPI[]>("/cart", {
        data,
    });
    return response.data;
};

// POST — add to cart
export const addToCart = async (data: AddToCartRequest): Promise<void> => {
    await apiClient.post("/cart", data);
};

// PUT — change item in cart (quantity)
export const updateCartItem = async (data: UpdateCartRequest): Promise<void> => {
    await apiClient.put("/cart", data);
};

// DELETE — delete item from cart
export const deleteCartItem = async (data: DeleteCartRequest): Promise<void> => {
    await apiClient.delete("/cart", { data });
};