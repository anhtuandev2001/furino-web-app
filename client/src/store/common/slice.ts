import { createAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../root/config.store';

export interface PageState {
  screenWidth: number;
  hiddenNavHeader: boolean;
}

const initialState: PageState = {
  screenWidth: 0,
  hiddenNavHeader: false,
};

// slice
export const commonsSlice = createSlice({
  name: 'commons',
  initialState,
  reducers: {
    setScreenWidth(state, action) {
      state.screenWidth = action.payload;
    },
    setHiddenNavHeader(state, action) {
      state.hiddenNavHeader = action.payload;
    },
  },
});

// Actions
export const commonActions = {
  setScreenWidth: createAction<number>('commons/setScreenWidth'),
  setHiddenNavHeader: createAction<boolean>('commons/setHiddenNavHeader'),
};

// Selectors
export const selectScreenWidth = (state: RootState) =>
  state.commons.screenWidth;

export const selectHiddenNavHeader = (state: RootState) =>
  state.commons.hiddenNavHeader;

// Reducer
export default commonsSlice.reducer;
