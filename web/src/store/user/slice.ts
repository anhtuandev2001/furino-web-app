import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import checkTokenExistence from '../../utils/hooks/checkToken';
import { getDataFromToken } from '../../utils/hooks/getToken';
import { RootState } from '../root/config.store';
import { UserInitialState } from './types';
import { toast } from 'react-toastify';

const initialState: UserInitialState = {
  user: {
    data: getDataFromToken(checkTokenExistence()) || {},
    status: 'idle',
    error: '',
  },
};

// slice
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = {
        ...state.user,
        data: {
          userId: null,
          name: '',
          email: '',
          password: '',
          role: {
            roleId: null,
            name: '',
          },
          status: true,
          token: '',
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userActions.loginUser.pending, (state) => {
        state.user.status = 'loading';
      })
      .addCase(userActions.loginUser.fulfilled, (state, action) => {
        state.user.data = action.payload;
        state.user.status = 'succeeded';
        toast.success('Login successfully');
        const token = action.payload.token;

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        document.cookie = `token=${token}; expires=${expirationDate}; path=/`;
        window.location.href = '/';
      })
      .addCase(userActions.loginUser.rejected, (state) => {
        state.user.status = 'failed';
      });
  },
});

// Actions
export const userActions = {
  loginUser: createAsyncThunk(
    `${userSlice.name}/loginUser`,
    async (data: { email: string; password: string }) => {
      try {
        const user = await ipaCall(
          'POST',
          `${BASE_URL}users/login`,
          false,
          {},
          data
        );
        return user;
      } catch (error) {
        console.log('error', error);
      }
    }
  ),
  logoutUser: createAction(`${userSlice.name}/logoutUser`),
};

// Selectors
export const selectUser = (state: RootState): any => state.users.user;

// Reducer
export default userSlice.reducer;
