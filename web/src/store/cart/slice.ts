import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { CartProp } from '../../types/carts';
import { BASE_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { selectUser } from '../user/slice';

export interface CartState {
  cart: {
    data: CartProp[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    totalQuantity?: number;
  };
  cartSelected: CartProp[];
  status: {
    add: string;
    delete: string;
    update: string;
    quantity: string;
  };
}

const initialState: CartState = {
  cart: {
    data: [],
    status: 'idle',
    error: null,
    totalQuantity: 0,
  },
  cartSelected: [],
  status: {
    add: 'idle',
    delete: 'idle',
    update: 'idle',
    quantity: 'idle',
  },
};

// slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onHandleChangeCartSelected(state, action) {
      state.cartSelected = action.payload;
    },
    onChangeTotalQuantity(state, action) {
      state.cart.totalQuantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartActions.getCarts.pending, (state) => {
        state.cart.status = 'loading';
      })
      .addCase(cartActions.getCarts.fulfilled, (state, action) => {
        state.cart.status = 'succeeded';
        state.cart.data = action.payload;
      })
      .addCase(cartActions.getCarts.rejected, (state) => {
        state.cart.status = 'failed';
      })
      .addCase(cartActions.onHandDeleteCart.pending, (state) => {
        state.status.delete = 'loading';
      })
      .addCase(cartActions.onHandDeleteCart.fulfilled, (state, action) => {
        state.status.delete = 'succeeded';
        state.cart.data = state.cart.data.filter(
          (cart: CartProp) => cart.cartId !== action.payload
        );
      })
      .addCase(cartActions.onHandDeleteCart.rejected, (state) => {
        state.status.delete = 'failed';
      })
      .addCase(cartActions.onHandleAddToCart.pending, (state) => {
        state.status.add = 'loading';
      })
      .addCase(cartActions.onHandleAddToCart.fulfilled, (state) => {
        state.status.add = 'succeeded';
      })
      .addCase(cartActions.onHandleAddToCart.rejected, (state, action) => {
        const error = action.payload as string;
        state.status.add = 'failed';
        toast.error(error.split('Error: ')[1]);
      })
      .addCase(cartActions.onHandleUpdateCart.pending, (state) => {
        state.status.update = 'loading';
      })
      .addCase(cartActions.onHandleUpdateCart.fulfilled, (state, action) => {
        state.status.update = 'succeeded';
        state.cart.data = state.cart.data.map((cart: CartProp) =>
          cart.cartId === action.payload.cartId
            ? { ...cart, quantity: action.payload.quantity }
            : cart
        );
      })
      .addCase(cartActions.onHandleUpdateCart.rejected, (state) => {
        state.status.update = 'failed';
        toast.error('Update cart failed');
      })
      .addCase(cartActions.getTotalQuantity.pending, (state) => {
        state.status.quantity = 'loading';
      })
      .addCase(cartActions.getTotalQuantity.fulfilled, (state, action) => {
        state.status.quantity = 'succeeded';
        state.cart.totalQuantity = action.payload;
      })
      .addCase(cartActions.getTotalQuantity.rejected, (state) => {
        state.status.quantity = 'failed';
      })
  },
});

// Actions
export const cartActions = {
  getCarts: createAsyncThunk(
    `${cartSlice.name}/getCarts`,
    async (_, thunkAPI) => {
      const user: any = selectUser(thunkAPI.getState() as RootState);
      const response = await ipaCall(
        'GET',
        `${BASE_URL}carts/${user.data.userId}`,
        true
      );

      return response;
    }
  ),
  onHandleAddToCart: createAsyncThunk(
    `${cartSlice.name}/onHandleAddToCart`,
    async (
      payload: {
        productId: number;
        quantity: number;
        productColorId: number;
        productSizeId: number;
      },
      thunkAPI
    ) => {
      try {
        const user: any = selectUser(thunkAPI.getState() as RootState);
        const response = await ipaCall(
          'POST',
          `${BASE_URL}carts`,
          true,
          {},
          {
            userId: user.data.userId,
            productId: payload.productId,
            quantity: payload.quantity,
            productColorId: payload.productColorId,
            productSizeId: payload.productSizeId,
          }
        );
        return response;
      } catch (e: any) {
        console.log(e);

        return thunkAPI.rejectWithValue(e.response.data.toString());
      }
    }
  ),
  onHandleCheckout: createAction<CartProp[]>(
    `${cartSlice.name}/onHandleChangeCartSelected`
  ),
  onHandDeleteCart: createAsyncThunk(
    `${cartSlice.name}/onHandDeleteCart`,
    async (cartId: number) => {
      await ipaCall('DELETE', `${BASE_URL}carts/${cartId}`, true);
      return cartId;
    }
  ),
  onHandleUpdateCart: createAsyncThunk(
    `${cartSlice.name}/onHandleUpdateCart`,
    async (payload: { cartId: number; quantity: number }) => {
      await ipaCall(
        'PATCH',
        `${BASE_URL}carts/${payload.cartId}`,
        true,
        {},
        {
          quantity: payload.quantity,
        }
      );
      return payload;
    }
  ),
  getTotalQuantity: createAsyncThunk(
    `${cartSlice.name}/getTotalQuantity`,
    async (_, thunkAPI) => {
      const user: any = selectUser(thunkAPI.getState() as RootState);
      if (Object.keys(user.data).length === 0){
        return 0;
      }
      const response = await ipaCall(
        'GET',
        `${BASE_URL}carts/total/${user.data.userId}`,
        true
      );

      return response;
    }
  ),
  onChangeTotalQuantity: createAction<number>(
    `${cartSlice.name}/onChangeTotalQuantity`
  ),
};

// Selectors
export const selectCarts = (state: RootState): any => state.carts.cart;
export const selectStatus = (state: RootState): any => state.carts.status;
export const selectCartSelected = (state: RootState): any =>
  state.carts.cartSelected;
export const selectTotalQuantity = (state: RootState): any =>
  state.carts.cart.totalQuantity;

// Reducer
export default cartSlice.reducer;
