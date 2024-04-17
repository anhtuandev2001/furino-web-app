import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { CartProp } from '../../types/carts';
import type { RootState } from '../root/config.store';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface CartState {
  carts: CartProp[];
  loading: boolean;
  loadingDeleteCart: boolean;
}

const initialState: CartState = {
  carts: [],
  loading: false,
  loadingDeleteCart: false,
};

// slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCarts(state) {
      state.loading = true;
    },
    getCartsSucceeded(state, action: PayloadAction<CartProp[]>) {
      state.carts = action.payload;
      state.loading = false;
    },
  },
});

// Actions
export const cartActions = {
  getCarts: createAction(`${cartSlice.name}/getCarts`),
  getCartsSucceeded: createAction<CartProp[]>(`${cartSlice.name}/getCartsSucceeded`),
  onDeleteCart: createAction<number>(`${cartSlice.name}/onDeleteCart`),
  onDeleteCartSucceeded: createAction<boolean>(`${cartSlice.name}/onDeleteCartSucceeded`),
};

// Selectors
export const selectLoading = (state: RootState): boolean => state.carts.loading;
export const selectCarts = (state: RootState): any => state.carts.carts;
export const selectLoadingDeleteCart = (state: RootState): boolean => state.carts.loadingDeleteCart;

// Reducer
export default cartSlice.reducer;
