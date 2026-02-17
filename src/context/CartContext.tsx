import { createContext, useContext, useState, useCallback, ReactNode } from "react";

import { AddToCartRequest, CartContextType, CartItemAPI, CartState } from "../types/cart.types";
import { useAuth } from "./AuthContext";
import {
    getCart,
    addToCart as apiAddToCart,
    updateCartItem,
    deleteCartItem,
} from "../api/cart";

const initialState: CartState = {
    cartItems: [],
    isLoading: false,
    error: null,
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const { sessionID } = useAuth();
    const [cartState, setCartState] = useState<CartState>(initialState);

    // GET — get cart items
    const fetchCart = useCallback(async () => {
        if (!sessionID) return;

        setCartState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const items = await getCart({
                sessionID: Number(sessionID),
                customerID: 0,
            });
            setCartState({ cartItems: items, isLoading: false, error: null });
        } catch {
            setCartState(prev => ({
                ...prev,
                isLoading: false,
                error: "Грешка при зареждане на количката.",
            }));
        }
    }, [sessionID]);

    // POST — add to cart
    const addToCart = async (stockID: number, quantity: number = 1) => {
        if (!sessionID) return;

        try {
            await apiAddToCart({
                sessionID: Number(sessionID),
                stockID,
                customerID: 0,
                quantity,
                information: "",
                additions: [],
                is_eshop: true,
                rootStockID: 0,
            });
            await fetchCart();
        } catch {
            setCartState(prev => ({
                ...prev,
                error: "Грешка при добавяне в количката.",
            }));
        }
    };

    // PUT — update quantity
    const updateQuantity = async (kasbuf_id: number, quantity: number) => {
        try {
            await updateCartItem({ id: kasbuf_id, quantity });
            await fetchCart();
        } catch {
            setCartState(prev => ({
                ...prev,
                error: "Грешка при обновяване на количеството.",
            }));
        }
    };

    // DELETE — remove item from cart
    const removeItem = async (kasbuf_id: number) => {
        try {
            await deleteCartItem({ id: kasbuf_id });
            await fetchCart();
        } catch {
            setCartState(prev => ({
                ...prev,
                error: "Грешка при премахване от количката.",
            }));
        }
    };

    return (
        <CartContext.Provider value={{ ...cartState, fetchCart, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook
export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart трябва да се използва вътре в CartProvider");
    }
    return context;
}