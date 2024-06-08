import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductResponseModel } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('add')
  addProduct(
    @Body('title') productTitle: string,
    @Body('desc') productDesc: string,
    @Body('price') productPrice: number,
  ): { id: string } {
    const productId: string = this.productService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );

    return { id: productId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string): Product {
    return this.productService.getProduct(productId);
  }

  @Patch('update/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('desc') productDesc: string,
    @Body('price') productPrice: number,
  ): ProductResponseModel {
    return this.productService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );
  }
}
