// Product from GET /getstockslite
export type ProductParam = {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    category?: string;
    stockID?: number;
};