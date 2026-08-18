import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductsCatalog {
  private productsList: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  protected events: IEvents;
    
  constructor(events: IEvents) {
    this.events = events;
  }
  
  setProductsList(products: IProduct[]): void {
    this.productsList = products;
    this.events.emit("products:changed");
  }

  getProductsList(): IProduct[] {
    return this.productsList;
  }

  getProduct(id: string): IProduct | undefined {
    return this.productsList.find((product) => product.id === id);
  }

  setSelectedProduct(id: string): void {
    const product = this.getProduct(id);
    this.selectedProduct = product ?? null;
    this.events.emit("product:selected");
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}