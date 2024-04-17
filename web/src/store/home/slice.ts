import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { ProductProp } from '../../types/product';
import type { RootState } from '../root/config.store';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface HomeState {
  products: ProductProp[];
  loading: boolean;
}

const initialState: HomeState = {
  products: [],
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
      state.loading = false;
    },
  },
});

// Actions
export const homeActions = {
  getProducts: createAction<LimitOffsetProps>(`${homeSlice.name}/getProducts`),
  getProductsSucceeded: createAction(`${homeSlice.name}/getProductsSucceeded`),
};

// Selectors
export const selectProducts = (state: RootState): ProductProp[] =>
  state.homes.products;
export const selectLoading = (state: RootState): boolean => state.homes.loading;

// Reducer
export default homeSlice.reducer;
