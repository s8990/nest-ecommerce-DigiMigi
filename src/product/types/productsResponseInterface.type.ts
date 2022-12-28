import { ProductType } from '@/product/types/product.type';

export interface ProductsResponseInterface {
  products: ProductType[];
  productsCount: number;
}
