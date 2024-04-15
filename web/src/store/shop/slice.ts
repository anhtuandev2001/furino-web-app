import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../root/config.store';
import { ProductProp } from '../../types/product';
import { CategoryProp } from '../../types/categories';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface ShopState {
  products: ProductProp[];
  limit: number;
  page: number;
  count: number;
  sort: string;
  categories: CategoryProp[];
  categoryIdSelected: { label: string; categoryId: number }[];
  keyword: string;
}

const initialState: ShopState = {
  products: [],
  limit: 10,
  page: 1,
  count: 0,
  sort: 'default',
  categoryIdSelected: [],
  categories: [],
  keyword: '',
};

// slice
export const shopSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    getProductsSucceeded(state, action: PayloadAction<ProductProp[]>) {
      state.products = action.payload;
    },
    onChangeLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    onChangePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    onchangeCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    onChangeSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    clearState(state) {
      state.products = [];
      state.limit = 10;
      state.page = 1;
      state.count = 0;
      state.sort = 'default';
    },
    onchangeCategoryIdSelected(
      state,
      action: PayloadAction<{ label: string; categoryId: number }[]>
    ) {
      state.categoryIdSelected = action.payload;
    },
    getCategoriesSuccess(state, action: PayloadAction<CategoryProp[]>) {
      state.categories = action.payload;
    },
    onChangeFilterFromUrl(
      state,
      action: PayloadAction<{
        limitUrl: number;
        pageUrl: number;
        keywordUrl: string;
        categoriesUrl: string | '';
      }>
    ) {
      state.limit = action.payload.limitUrl || 10;
      state.page = action.payload.pageUrl || 1;
      state.keyword = action.payload.keywordUrl || '';
      const categories = state.categories;

      if (action.payload.categoriesUrl) {
        const categoriesSelected = action.payload.categoriesUrl
          .split(',')
          .map(Number);
        state.categoryIdSelected = categoriesSelected.map((categoryId) => {
          const category = categories.find(
            (category) => category.categoryId === categoryId
          );
          return {
            label: category?.name || '',
            categoryId: categoryId,
          };
        });
      }
    },
    onChangeKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

// Actions
export const shopActions = {
  getProductsSucceeded: shopSlice.actions.getProductsSucceeded,
  getProductOfShopPage: createAction<{
    limitUrl: string | null;
    pageUrl: string | null;
    keywordUrl: string | null;
    categoriesUrl: string | null;
  }>(`${shopSlice.name}/getProductOfShopPage`),
  getProductSuggestions: createAction<{
    categoryId: number[];
    productId: number;
  }>(`${shopSlice.name}/getProductSuggestions`),
  onChangeLimit: createAction<number>(`${shopSlice.name}/onChangeLimit`),
  onChangePage: createAction<number>(`${shopSlice.name}/onChangePage`),
  onchangeCount: createAction<number>(`${shopSlice.name}/onchangeCount`),
  onChangeSort: createAction<string>(`${shopSlice.name}/onChangeSort`),
  clearState: createAction(`${shopSlice.name}/clearState`),
  onchangeCategoryIdSelected: createAction<
    { label: string; categoryId: number }[]
  >(`${shopSlice.name}/onchangeCategoryIdSelected`),
  getCategoriesSuccess: createAction<CategoryProp[]>(
    `${shopSlice.name}/getCategoriesSuccess`
  ),
  onChangeFilterFromUrl: createAction<{
    limitUrl: number;
    pageUrl: number;
    keywordUrl: string;
    categoriesUrl: string;
  }>(`${shopSlice.name}/onChangeFilterFromUrl`),
  onChangeKeyword: createAction<string>(`${shopSlice.name}/onChangeKeyword`),
};

// Selectors
export const selectProducts = (state: RootState): ProductProp[] =>
  state.shops.products;
export const selectLimit = (state: RootState): number => state.shops.limit;
export const selectPage = (state: RootState): number => state.shops.page;
export const selectCount = (state: RootState): number => state.shops.count;
export const selectSort = (state: RootState): string => state.shops.sort;
export const selectCategories = (state: RootState): CategoryProp[] =>
  state.shops.categories;
export const selectCategoriesSelected = (
  state: RootState
): { label: string; categoryId: number }[] => state.shops.categoryIdSelected;
export const selectKeyword = (state: RootState): string => state.shops.keyword;

// Reducer
export default shopSlice.reducer;
