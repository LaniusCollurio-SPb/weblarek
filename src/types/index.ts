import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export interface IBuyer {
    payment: TPayment | null;
    address: string;
    email: string;
    phone: string;
}

export interface IValidateData {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export type TCategory = keyof typeof categoryMap;

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}
