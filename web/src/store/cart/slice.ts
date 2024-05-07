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
  };
  cartSelected: CartProp[];
  status: {
    add: string;
    delete: string;
    update: string;
  };
}

const initialState: CartState = {
  cart: {
    data: [],
    status: 'idle',
    error: null,
  },
  cartSelected: [],
  status: {
    add: 'idle',
    delete: 'idle',
    update: 'idle',
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
        toast.success('Add to cart successfully');
      })
      .addCase(cartActions.onHandleAddToCart.rejected, (state) => {
        state.status.add = 'failed';
        toast.error('Add to cart failed');
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
      });
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
        return thunkAPI.rejectWithValue(e.message.toString());
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
};

// Selectors
export const selectCarts = (state: RootState): any => state.carts.cart;
export const selectStatus = (state: RootState): any => state.carts.status;
export const selectCartSelected = (state: RootState): any =>
  state.carts.cartSelected;

// Reducer
export default cartSlice.reducer;
