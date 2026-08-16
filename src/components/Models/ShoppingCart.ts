import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShoppingCart {
  private productsList: IProduct[] = [];
  protected events: IEvents;
  
  constructor (events: IEvents) {
    this.events = events;
  }

  addProduct(product: IProduct): void {
    this.productsList.push(product);
    this.events.emit("cart:changed");
  }

  getProductsList(): IProduct[] {
    return this.productsList;
  }

  removeProduct(id: string): void {
    this.productsList = this.productsList.filter(product => product.id !== id);
    this.events.emit("cart:changed");
  }

  clearShoppingCart(): void {
    this.productsList = [];
    this.events.emit("cart:changed");
  }

  getTotalPrice(): number {
    return this.productsList.reduce((total, product) => {
      return total + (product.price ?? 0);
    }, 0);
  }

  getNumberOfProducts(): number {
    return this.productsList.length;
  }

  checkProduct(id: string): boolean {
    return this.productsList.some(product => product.id === id);
  }
}