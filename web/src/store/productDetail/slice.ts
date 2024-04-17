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
  loadingButton: boolean;
}

const initialState: productDetailState = {
  product: null,
  productSuggestion: [],
  loading: false,
  loadingButton: false,
};

// slice
export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    getProductSucceeded(state, action: PayloadAction<ProductProp>) {
      state.product = action.payload;
    },
    getProductSuggestionsSucceeded(
      state,
      action: PayloadAction<ProductProp[]>
    ) {
      state.productSuggestion = action.payload;
    },
    onHandleLoading(state, action) {
      state.loading = action.payload;
    },
    onHandleLoadingButton(state, action) {
      state.loadingButton = action.payload;
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
    `${productDetailSlice.name}/getProductSuggestionsSucceeded`
  ),
  onHandleAddToCart: createAction<{
    productId: number;
    quantity: number;
    productColorId: number;
    productSizeId: number;
  }>(`${productDetailSlice.name}/onHandleAddToCart`),
  onHandleLoading: createAction<boolean>(
    `${productDetailSlice.name}/onHandleLoading`
  ),
  onHandleLoadingButton: createAction<boolean>(
    `${productDetailSlice.name}/onHandleLoadingButton`
  ),
};

// Selectors
export const selectProduct = (state: RootState): ProductProp | null =>
  state.productDetails.product;
export const selectProductSuggestion = (state: RootState): ProductProp[] | [] =>
  state.productDetails.productSuggestion;
export const selectLoading = (state: RootState): boolean =>
  state.productDetails.loading;
export const selectLoadingAddToCart = (state: RootState): boolean =>
  state.productDetails.loadingButton;

// Reducer
export default productDetailSlice.reducer;
