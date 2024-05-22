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
  status: {
    login: 'idle',
    register: 'idle',
  }
};

// slice
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Logout successful');
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
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      })
      .addCase(userActions.loginUser.rejected, (state) => {
        state.user.status = 'failed';
        toast.error('Email or Password is incorrect');
      })
      .addCase(userActions.getUser.pending, (state) => {
        state.user.status = 'loading';
      })
      .addCase(userActions.getUser.fulfilled, (state, action) => {
        state.user.data = { ...state.user.data, ...action.payload };
        state.user.status = 'succeeded';
      })
      .addCase(userActions.getUser.rejected, (state) => {
        state.user.status = 'failed';
        toast.error('Get user failed');
      })
      .addCase(userActions.register.pending, (state) => {
        state.status.register = 'loading';
      })
      .addCase(userActions.register.fulfilled, (state) => {
        state.status.register = 'succeeded';
        toast.success('Register successfully');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      })
      .addCase(userActions.register.rejected, (state) => {
        state.status.register = 'failed';
        toast.error('Register failed');
      });
  },
});

// Actions
export const userActions = {
  loginUser: createAsyncThunk(
    `${userSlice.name}/loginUser`,
    async (data: { email: string; password: string }) => {
      const user = await ipaCall(
        'POST',
        `${BASE_URL}users/login`,
        false,
        {},
        data
      );
      return user;
    }
  ),
  logoutUser: createAction(`${userSlice.name}/logoutUser`),
  getUser: createAsyncThunk(
    `${userSlice.name}/getUser`,
    async (_, thunkAPI) => {
      const userId: any = selectUser(thunkAPI.getState() as RootState);

      const user = await ipaCall(
        'GET',
        `${BASE_URL}users/${userId.data.userId}`,
        true
      );
      return user;
    }
  ),
  register: createAsyncThunk(
    `${userSlice.name}/register`,
    async (data: any) => {
      const user = await ipaCall(
        'POST',
        `${BASE_URL}users/register`,
        false,
        {},
        data
      );
      return user;
    }
  ),
};

// Selectors
export const selectUser = (state: RootState): any => state.users.user;
export const selectStatus = (state: RootState): any => state.users.status;

// Reducer
export default userSlice.reducer;
