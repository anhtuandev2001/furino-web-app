import { CategoryProp } from '../../types/categories';
import { ProductProp } from '../../types/product';

export interface ShopInitialState {
  products: ProductState;
  categories: CategoryState;
  categoryIds: { label: string; categoryId: number }[];
}

export interface ProductState {
  data: ProductProp[];
  limit: number;
  page: number;
  count: number;
  sort: string;
  keyword: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

export interface CategoryState {
  data: CategoryProp[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
