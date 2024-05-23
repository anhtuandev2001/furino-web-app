import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipaCall } from '../../utils/hooks/apiCall';
import { RootState } from '../root/config.store';
import { BASE_URL } from '../../utils/constants/strapi';

// Types
interface ProductState {
  data: any[];
  limit: number;
  page: number;
  count: number;
  status: string;
  error: string;
}

interface SearchInitialState {
  keyword: string;
  products: ProductState;
  productSuggest: ProductState;
}

const initialState: SearchInitialState = {
  keyword: '',
  products: {
    data: [],
    limit: 20,
    page: 1,
    count: 0,
    status: 'idle',
    error: '',
  },
  productSuggest: {
    data: [],
    limit: 5,
    page: 1,
    count: 0,
    status: 'idle',
    error: '',
  },
};

// slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onChangeKeyword(state, action) {
      state.keyword = action.payload;
    },
    onResetState(state) {
      state.keyword = '';
      state.products = initialState.products;
      state.productSuggest = initialState.productSuggest;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchActions.searchProductSuggest.pending, (state) => {
        state.productSuggest.status = 'loading';
      })
      .addCase(
        searchActions.searchProductSuggest.fulfilled,
        (state, action) => {
          state.productSuggest.status = 'succeeded';
          state.productSuggest.data = action.payload;
          state.productSuggest.count = action.payload.length;
        }
      )
      .addCase(searchActions.searchProductSuggest.rejected, (state, action) => {
        state.productSuggest.status = 'failed';
        state.productSuggest.error = action.payload as string;
      })
      .addCase(searchActions.searchGetProducts.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(searchActions.searchGetProducts.fulfilled, (state, action) => {
        state.products.status = 'succeeded';
        state.products.data = action.payload;
        state.products.count = action.payload.length;
      })
      .addCase(searchActions.searchGetProducts.rejected, (state, action) => {
        state.products.status = 'failed';
        state.products.error = action.payload as string;
      });
  },
});

// Actions
export const searchActions = {
  onChangeKeyword: createAction<string>('search/onChangeKeyword'),
  searchProductSuggest: createAsyncThunk(
    'search/searchProductSuggest',
    async (_, thunkAPI) => {
      try {
        const keyword = (thunkAPI.getState() as RootState).search.keyword;
        const limit = (thunkAPI.getState() as RootState).search.productSuggest.limit;
        const response = await ipaCall(
          'GET',
          `${BASE_URL}/products/search/${keyword}`,
          true,
          {
            limit,
          }
        );

        return response;
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message.toString());
      }
    }
  ),
  searchGetProducts: createAsyncThunk(
    'search/searchGetProducts',
    async (_, thunkAPI) => {
      try {
        const keyword = (thunkAPI.getState() as RootState).search.keyword;
        const limit = (thunkAPI.getState() as RootState).search.products.limit;
        const response = await ipaCall(
          'GET',
          `${BASE_URL}/products/search/${keyword}`,
          true,
          {
            limit,
          }
        );

        return response;
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message.toString());
      }
    }
  ),
  onResetState: createAction('search/onResetState'),
};

// Selectors
export const selectSearch = (state: RootState) => state.search;
export const selectProducts = (state: RootState) => state.search.products;
export const selectProductSuggest = (state: RootState) => state.search.productSuggest;
export const selectKeyword = (state: RootState) => state.search.keyword;

// Reducer
export default searchSlice.reducer;
