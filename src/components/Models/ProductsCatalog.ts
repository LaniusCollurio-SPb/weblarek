import { IProduct } from "../../types";

export class ProductsCatalog {
  private productsList: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  
  constructor() {}
  
  setProductsList(products: IProduct[]): void {
    this.productsList = products;
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
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}