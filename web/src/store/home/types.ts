import { ProductProp } from '../../types/product';

export interface HomeInitialState {
  products: ProductState;
}

export interface ProductState {
  data: ProductProp[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
}
