import { ProductProp } from '../../types/product';

export interface ProductDetailInitialState {
  product: ProductDetailState;
  productSuggestion: ProductsDetailState;
  status: {
    add: string;
    delete: string;
  };
}

export interface ProductDetailState {
  data: ProductProp | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ProductsDetailState {
  data: ProductProp[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
