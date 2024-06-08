export class Product {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public price: number,
  ) {}
}

export interface ProductResponseModel extends Product {
  message: string;
}
