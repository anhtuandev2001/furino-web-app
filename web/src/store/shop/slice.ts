import {
  createAction,
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { CategoryState, ProductState, ShopInitialState } from './types';

const initialState: ShopInitialState = {
  products: {
    data: [],
    limit: 10,
    page: 1,
    count: 0,
    sort: 'default',
    keyword: '',
    status: 'idle',
    error: '',
  },
  categories: {
    data: [],
    status: 'idle',
    error: '',
  },
  categoryIds: [],
};

// slice
export const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    onChangeLimit(state, action: PayloadAction<number>) {
      state.products.limit = action.payload;
    },
    onChangePage(state, action: PayloadAction<number>) {
      state.products.page = action.payload;
    },
    onchangeCount(state, action: PayloadAction<number>) {
      state.products.count = action.payload;
    },
    onChangeSort(state, action: PayloadAction<string>) {
      state.products.sort = action.payload;
    },
    onChangeKeyword(state, action: PayloadAction<string>) {
      state.products.keyword = action.payload;
    },
    onchangeCategoryIds(
      state,
      action: PayloadAction<{ label: string; categoryId: number }[]>
    ) {
      state.categoryIds = action.payload;
    },
    onNextPageScroll(state) {
      state.products.page += 1;
    },
    clearState(state) {
      state.products.data = [];
      state.products.limit = 10;
      state.products.page = 1;
      state.products.count = 0;
      state.products.sort = 'default';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shopActions.getProducts.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(shopActions.getProducts.fulfilled, (state, action) => {
        const { products, categoryIds }: any = action.payload;
        state.products = products;
        state.categoryIds = categoryIds;
      })
      .addCase(shopActions.getProducts.rejected, (state, action) => {
        state.products.status = 'failed';
        state.products.error = action.error.message as string;
      })
      .addCase(shopActions.getCategory.pending, (state) => {
        state.categories.status = 'loading';
      })
      .addCase(shopActions.getCategory.fulfilled, (state, action) => {
        state.categories.status = 'succeeded';
        state.categories.data = action.payload;
      })
      .addCase(shopActions.getCategory.rejected, (state, action) => {
        state.categories.status = 'failed';
        state.categories.error = action.error.message as string;
      })
      .addCase(shopActions.getProductsLoadingNextPage.pending, (state) => {
        state.products.status = 'loading';
      })
      .addCase(
        shopActions.getProductsLoadingNextPage.fulfilled,
        (state, action) => {
          console.log('action.payload', action.payload);
          if (!action.payload) {
            state.products.status = 'succeeded';
            state.products.error = 'No more products';
            return;
          }
          const { products, categoryIds }: any = action.payload;
          state.products = products;
          state.categoryIds = categoryIds;
        }
      )
      .addCase(
        shopActions.getProductsLoadingNextPage.rejected,
        (state, action) => {
          state.products.status = 'failed';
          state.products.error = action.error.message as string;
        }
      );
  },
});

// Actions
export const shopActions = {
  getProductOfShopPage: createAction<{
    limitUrl: string | null;
    pageUrl: string | null;
    keywordUrl: string | null;
    categoriesUrl: string | null;
  }>(`${shopSlice.name}/getProductOfShopPage`),
  getProducts: createAsyncThunk(
    `${shopSlice.name}/getProducts`,
    async (payload: any, thunkAPI) => {
      const currentState: any = thunkAPI.getState();
      const currentProducts = currentState.shops.products;
      const categoryIds = currentState.shops.categoryIds;
      const { limitUrl, pageUrl, keywordUrl, categoriesUrl } = payload;
      const { limit, page, sort, keyword } = currentProducts;

      try {
        const products = await ipaCall('GET', `${BASE_URL}products`, false, {
          limit: limitUrl || limit,
          page: pageUrl || page,
          sort: sort === 'default' ? 'productId' : sort,
          keyword: keywordUrl || keyword,
          categoryIds: categoriesUrl
            ? categoriesUrl.split(',').map((item: any) => Number(item))
            : categoryIds.map((item: any) => item.categoryId),
        });

        if (products) {
          const categories: any = selectCategories(
            thunkAPI.getState() as RootState
          );
          // console.log(
          //   categories.data
          //     .map((item: any) => ({
          //       label: item.name,
          //       categoryId: item.categoryId,
          //     }))
          //     .filter((item: any) => categoriesUrl.includes(item.categoryId))
          // );

          return {
            products: {
              data: products.data,
              limit: Number(limitUrl) || limit,
              page: Number(pageUrl) || page,
              count: products.count,
              sort: sort,
              keyword: keywordUrl || keyword,
              status: 'succeeded',
            },
            categoryIds: categoriesUrl
              ? categories.data
                  .map((item: any) => ({
                    label: item.name,
                    categoryId: item.categoryId,
                  }))
                  .filter((item: any) =>
                    categoriesUrl.includes(item.categoryId)
                  )
              : categoryIds,
          };
        }
        return null;
      } catch (e: any) {
        console.log(e);
      }
    }
  ),
  onNextPageScroll: createAction(`${shopSlice.name}/onNextPageScroll`),
  getProductsLoadingNextPage: createAsyncThunk(
    `${shopSlice.name}/getProductsLoadingNextPage`,
    async (_, thunkAPI) => {
      const currentState: any = thunkAPI.getState();
      const currentProducts = currentState.shops.products;
      const categoryIds = currentState.shops.categoryIds;
      const { data, limit, page, sort, keyword, error } = currentProducts;

      if (error) {
        return null;
      }

      try {
        const products = await ipaCall('GET', `${BASE_URL}products`, false, {
          limit: limit,
          page: page,
          sort: sort === 'default' ? 'productId' : sort,
          keyword: keyword,
          categoryIds: categoryIds.map((item: any) => item.categoryId),
        });

        if (products.data.length > 0) {
          return {
            products: {
              data: [...data, ...products.data],
              limit: limit,
              page: page,
              count: products.count,
              sort: sort,
              keyword: keyword,
              status: 'succeeded',
            },
            categoryIds: categoryIds,
          };
        }
        return null;
      } catch (e: any) {
        console.log(e);
      }
    }
  ),
  getCategory: createAsyncThunk(
    `${shopSlice.name}/categories`,
    async (_payload, thunkAPI) => {
      try {
        const categories = await ipaCall('GET', `${BASE_URL}categories`, false);
        return categories;
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message.toString());
      }
    }
  ),
  onChangeLimit: createAction<number>(`${shopSlice.name}/onChangeLimit`),
  onChangePage: createAction<number>(`${shopSlice.name}/onChangePage`),
  onchangeCount: createAction<number>(`${shopSlice.name}/onchangeCount`),
  onChangeSort: createAction<string>(`${shopSlice.name}/onChangeSort`),
  onChangeKeyword: createAction<string>(`${shopSlice.name}/onChangeKeyword`),
  onchangeCategoryIds: createAction<{ label: string; categoryId: number }[]>(
    `${shopSlice.name}/onchangeCategoryIds`
  ),
  onChangeFilterFromUrl: createAction<{
    limitUrl: number;
    pageUrl: number;
    keywordUrl: string;
    categoriesUrl: string;
  }>(`${shopSlice.name}/onChangeFilterFromUrl`),
  clearState: createAction(`${shopSlice.name}/clearState`),
};

// Selectors
export const selectProducts = (state: RootState): ProductState =>
  state.shops.products;
export const selectCategories = (state: RootState): CategoryState =>
  state.shops.categories;
export const selectCategoryIds = (state: RootState) => state.shops.categoryIds;

// Reducer
export default shopSlice.reducer;
