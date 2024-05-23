import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { NotificationProp } from '../../types/notifications';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { selectUser } from '../user/slice';

export interface NotificationState {
  notifications: {
    data: NotificationProp[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}

const initialState: NotificationState = {
  notifications: {
    data: [],
    status: 'idle',
    error: null,
  },
};

// slice
export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notificationActions.getNotifications.pending, (state) => {
        state.notifications.status = 'loading';
      })
      .addCase(notificationActions.getNotifications.fulfilled, (state, action) => {
        state.notifications.status = 'succeeded';
        state.notifications.data = action.payload;
      })
      .addCase(notificationActions.getNotifications.rejected, (state) => {
        state.notifications.status = 'failed';
      });
  },
});

// Actions
export const notificationActions = {
  getNotifications: createAsyncThunk(
    `${notificationSlice.name}/getNotifications`,
    async (_, thunkAPI) => {
      const user: any = selectUser(thunkAPI.getState() as RootState);
      const response = await ipaCall(
        'GET',
        `${BASE_URL}notifications/${user.data.userId}`,
        true
      );

      return response;
    }
  ),
};

// Selectors
export const selectNotifications = (state: RootState): any => state.notifications.notifications;

// Reducer
export default notificationSlice.reducer;
