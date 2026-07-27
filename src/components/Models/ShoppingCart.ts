import { IProduct } from "../../types";

export class ShoppingCart {
  private productsList: IProduct[] = [];
  
  constructor () {}

  addProduct(product: IProduct): void {
    this.productsList.push(product);
  }

  getProductsList(): IProduct[] {
    return this.productsList;
  }

  removeProduct(id: string): void {
    this.productsList = this.productsList.filter(product => product.id !== id);
  }

  clearShoppingCart(): void {
    this.productsList = [];
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