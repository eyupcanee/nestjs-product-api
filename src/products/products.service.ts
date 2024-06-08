import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductResponseModel } from './product.model';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const productId: string = Math.random().toString();
    const newProduct = new Product(productId, title, desc, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      throw new NotFoundException('Product could not found');
    }
    return { ...product };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    return [product, productIndex];
  }

  updateProduct(
    productId: string,
    prodcutTitle?: string,
    productDesc?: string,
    productPrice?: number,
  ): ProductResponseModel {
    const [product, productIndex] = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (prodcutTitle) updatedProduct.title = prodcutTitle;
    if (productDesc) updatedProduct.desc = productDesc;
    if (productPrice) updatedProduct.price = productPrice;

    this.products[productIndex] = updatedProduct;

    return {
      message: 'Product has been updated!',
      ...updatedProduct,
    };
  }
}
