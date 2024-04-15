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
}

const initialState: productDetailState = {
  product: null,
  productSuggestion: [],
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

// Reducer
export default productDetailSlice.reducer;
