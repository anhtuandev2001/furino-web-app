import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { HomeInitialState, ProductState } from './types';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}
const initialState: HomeInitialState = {
  products: {
    data: [],
    status: 'idle',
    error: '',
  },
};

// slice
export const homeSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homeActions.getProducts.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(homeActions.getProducts.fulfilled, (state, action) => {
        state.products.status = 'succeeded';
        state.products.data = action.payload;
      })
      .addCase(homeActions.getProducts.rejected, (state) => {
        state.products.status = 'failed';
      });
  },
});

// Actions
export const homeActions = {
  getProducts: createAsyncThunk(
    `${homeSlice.name}/getProducts`,
    async (limitOffset: LimitOffsetProps) => {
      const products = await ipaCall('GET', `${BASE_URL}/products`, false, {
        limit: limitOffset.limit,
        page: limitOffset.page,
      });

      return products.data;
    }
  ),
};

// Selectors
export const selectProducts = (state: RootState): ProductState =>
  state.homes.products;

// Reducer
export default homeSlice.reducer;
