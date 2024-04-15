import { createAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../root/config.store';

export interface PageState {
  loadingPage: boolean;
}

const initialState: PageState = {
  loadingPage: false,
};

// slice
export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    onChangeLoadingPage(state, action) {
      state.loadingPage = action.payload;
    },
  },
});

// Actions
export const pagesActions = {
  onChangeLoadingPage: createAction<boolean>(
    `${pagesSlice.name}/onChangeLoadingPage`
  ),
};

// Selectors
export const selectLoadingPage = (state: RootState) => state.pages.loadingPage;

// Reducer
export default pagesSlice.reducer;
