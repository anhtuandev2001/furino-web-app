import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../root/config.store';
import { ProductProp } from '../../types/product';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface productDetailState {
  product: null | ProductProp;
  productSuggestion: ProductProp[];
  loading: boolean;
}

const initialState: productDetailState = {
  product: null,
  productSuggestion: [],
  loading: false,
};

// slice
export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    getProductSucceeded(state, action: PayloadAction<ProductProp>) {
      state.product = action.payload;
    },
    getProductSuggestions(state, action: PayloadAction<ProductProp[]>) {
      state.productSuggestion = action.payload;
      state.loading = false;
    },
    getProductSuggestionsSucceeded(state) {
      state.loading = true;
    },
  },
});

// Actions
export const productDetailActions = {
  getProduct: createAction<number>(`${productDetailSlice.name}/getProduct`),
  getProductSucceeded: createAction<ProductProp>(
    `${productDetailSlice.name}/getProductSucceeded`
  ),
  getProductSuggestionsSucceeded: createAction<ProductProp[]>(
    `${productDetailSlice.name}/getProductSuggestions`
  ),
  onHandleAddToCart: createAction<{
    productId: number;
    quantity: number;
    productColorId: number;
    productSizeId: number;
  }>(`${productDetailSlice.name}/onHandleAddToCart`),
};

// Selectors
export const selectProduct = (state: RootState): ProductProp | null =>
  state.productDetails.product;

export const selectProductSuggestion = (state: RootState): ProductProp[] | [] =>
  state.productDetails.productSuggestion;

export const selectLoading = (state: RootState): boolean =>
  state.productDetails.loading;

// Reducer
export default productDetailSlice.reducer;
