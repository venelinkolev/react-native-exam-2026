// Item in Cart from API
export type CartItemAPI = {
    kasbuf_id: number;
    stock_id: number;
    name: string;
    price: number;
    sum_price: number;
    quantity: number;
    more_info?: string;
    image?: string | null;
};

// Request POST /cart (adding to cart)
export type AddToCartRequest = {
    sessionID: number;
    stockID: number;
    customerID: 0;
    quantity: number;
    information: string;
    additions: [];
    is_eshop: true;
    rootStockID: 0;
};

// Request GET /cart (loading cart)
export type GetCartRequest = {
    sessionID: number;
    customerID: 0;
};

// Request PUT /cart (updating quantity)
export type UpdateCartRequest = {
    id: number;
    quantity: number;
};

// Request DELETE /cart (removing item)
export type DeleteCartRequest = {
    id: number;
};

// State in CartContext
export type CartState = {
    cartItems: CartItemAPI[];
    isLoading: boolean;
    error: string | null;
};

// Methods in CartContext
export type CartContextType = CartState & {
    fetchCart: () => Promise<void>;
    addToCart: (stockID: number, quantity?: number) => Promise<void>;
    updateQuantity: (kasbuf_id: number, quantity: number) => Promise<void>;
    removeItem: (kasbuf_id: number) => Promise<void>;
};