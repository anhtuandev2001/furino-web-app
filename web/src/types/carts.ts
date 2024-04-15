import { ProductColor, ProductSize } from './product';

export interface CartProp {
  productId: number;
  quantity: number;
  productColor: ProductColor;
  productSizeId: ProductSize;
  name: string;
  price: number;
}
