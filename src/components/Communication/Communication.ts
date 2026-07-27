import { IApi, IOrder, IOrderResponse, IProductsResponse } from "../../types";

export class Communication {
  
  constructor(private api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductsResponse> {
    return this.api.get('/product/');
  }

  createOrder(orderData: IOrder): Promise<IOrderResponse> {
    return this.api.post('/order/', orderData);
  }
}