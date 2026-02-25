// API /getstockslite
export type ProductAPI = {
    stk_idnumb: number;
    stk_name: string;
    basic_price: number;
    price: number;
    description?: string;
    image?: string | null;
    gr_id?: number;
    code?: string;
};

// Product Type for UI
export type ProductParam = {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
    category?: string;
    stockID: number;
};

// API /groups - raw response item
export type GroupAPI = {
    id: number;
    name: string;
    image: string;
    parentID: number;
    tag: number;
    group_address: {
        id: number;
        name: string;
        parentID: number;
        is_page: boolean;
    }[];
};

// Group Type for UI
export type Group = {
    id: number;
    name: string;
    parentID: number;
};