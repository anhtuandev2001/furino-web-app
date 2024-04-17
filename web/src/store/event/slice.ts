import { createAppSlice } from '../createAppSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export interface EventSliceState {
  files: any;
}

const initialState: EventSliceState = {
  files: {
    data: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    status: 'idle',
    error: '',
  },
};

export const eventSlice = createAppSlice({
  name: 'event',
  initialState,
  reducers: (create) => ({
    setFilesPagination: create.reducer(
      (
        state,
        action: PayloadAction<{ currentPage: number; pageSize: number }>
      ) => {
        state.files.currentPage = action.payload.currentPage;
        state.files.pageSize = action.payload.pageSize;
      }
    ),
    getFiles: create.asyncThunk(
      async ({ page, limit }: { page: number; limit: number }) => {
        const response : any = await fetch(
          `http://localhost:1337/events?_start=${(page - 1) * limit}&_limit=${limit}`
        );
        return response.data;
      },
      {
        pending: (state) => {
          state.files.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.files = { ...action.payload, status: 'idle' };
        },
        rejected: (state) => {
          state.files.status = 'failure';
        },
      }
    ),
  }),
  selectors: {
    selectFiles: (state) => state.files,
  },
});

export const { getFiles, setFilesPagination } = eventSlice.actions;

export const { selectFiles } = eventSlice.selectors;

export const { actions: eventActions, reducer: eventReducer } = eventSlice;
