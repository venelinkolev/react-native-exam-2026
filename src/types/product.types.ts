// Product type
export type ProductParam = {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    category?: string;
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};