import { ProductColor, ProductSize } from './product';

export interface CartProp {
  cartId: number;
  productId: number;
  quantity: number;
  productColor: ProductColor;
  productSizeId: ProductSize;
  name: string;
  price: number;
}
