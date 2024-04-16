import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../root/config.store';
import { ProductProp } from '../../types/product';
import { CartProp } from '../../types/carts';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface HomeState {
  products: ProductProp[];
  carts: any;
  loading: boolean;
}

const initialState: HomeState = {
  products: [],
  carts: [],
  loading: false,
};

// slice
export const homeSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {
    getProducts(state) {
      state.loading = true;
    },
    getProductsSucceeded(state, action: PayloadAction<ProductProp[]>) {
      state.products = action.payload;
      state.loading= false;
    },
    getCartsSucceeded(state, action: PayloadAction<CartProp[]>) {
      state.carts = action.payload;
    },
  },
});

// Actions
export const homeActions = {
  getProducts: createAction<LimitOffsetProps>(`${homeSlice.name}/getProducts`),
  getProductsSucceeded: createAction(`${homeSlice.name}/getProductsSucceeded`),
  getCarts: createAction(`${homeSlice.name}/getCarts`),
  getCartsSucceeded: createAction<any>(`${homeSlice.name}/getCartsSucceeded`),
  onDeleteCart: createAction<number>(`${homeSlice.name}/onDeleteCart`),
};

// Selectors
export const selectProducts = (state: RootState): ProductProp[] =>
  state.homes.products;
export const selectLoading = (state: RootState): boolean => state.homes.loading;

export const selectCarts = (state: RootState): any => state.homes.carts;

// Reducer
export default homeSlice.reducer;
