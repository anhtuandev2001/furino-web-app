import {
  createAction,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../root/config.store';
import checkTokenExistence from '../../utils/hooks/checkToken';
import { getDataFromToken } from '../../utils/hooks/getToken';

export interface LimitOffsetProps {
  limit: number;
  page: number;
}

export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: getDataFromToken(checkTokenExistence()) || {},
};

// slice
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUserSuccess: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.user = '';
    },
  },
});

// Actions
export const userActions = {
  loginUser: createAction<{ email: string; password: string }>(
    `${userSlice.name}/loginUser`
  ),
  logoutUser: createAction(`${userSlice.name}/logoutUser`),
  registerUser: createAction<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }>(`${userSlice.name}/registerUser`),
  loginUserSuccess: createAction<{ user: any }>(
    `${userSlice.name}/loginUserSuccess`
  ),
};

// Selectors
export const selectUser = (state: RootState): any => state.users.user;

// Reducer
export default userSlice.reducer;
