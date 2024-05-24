import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-hot-toast';
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
  actions: {
    add: string;
    delete: {
      status: string;
      cartId: number | null;
    };
    update: {
      status: string;
      cartId: number | null;
    };
    quantity: string;
  };
  cartNotification: {
    show: boolean;
    cart: any;
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
  actions: {
    add: 'idle',
    delete: {
      status: 'idle',
      cartId: null,
    },
    update: {
      status: 'idle',
      cartId: null,
    },
    quantity: 'idle',
  },
  cartNotification: {
    show: false,
    cart: null,
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
    increaseTotalQuantity(state, action) {
      state.cart.totalQuantity = state.cart.totalQuantity + action.payload;
    },
    decreaseTotalQuantity(state, action) {
      if (!state.cart.totalQuantity) return;
      state.cart.totalQuantity = state?.cart?.totalQuantity - action.payload;
    },
    hideCartNotification(state) {
      state.cartNotification = {
        show: false,
        cart: null,
      };
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
      .addCase(cartActions.onHandDeleteCart.pending, (state, action) => {
        state.actions.delete = {
          status: 'loading',
          cartId: action.meta.arg,
        };
      })
      .addCase(cartActions.onHandDeleteCart.fulfilled, (state, action) => {
        state.actions.delete.status = 'succeeded';
        state.cart.data = state.cart.data.filter(
          (cart: CartProp) => cart.cartId !== action.payload
        );
      })
      .addCase(cartActions.onHandDeleteCart.rejected, (state) => {
        state.actions.delete.status = 'failed';
      })
      .addCase(cartActions.onHandleAddToCart.pending, (state) => {
        state.actions.add = 'loading';
      })
      .addCase(cartActions.onHandleAddToCart.fulfilled, (state, action) => {
        state.actions.add = 'succeeded';
        state.cartNotification = {
          show: true,
          cart: action.payload,
        };
        if (state.cart.status === 'idle') return;
        const carts = state.cart.data;
        const cart = action.payload;
        if (carts.find((c: CartProp) => c.cartId === cart.cartId)) {
          state.cart.data = carts.map((c: CartProp) =>
            c.cartId === cart.cartId ? cart : c
          );
        } else {
          state.cart.data = [cart, ...carts];
        }
      })
      .addCase(cartActions.onHandleAddToCart.rejected, (state, action) => {
        const error = action.payload as string;
        state.actions.add = 'failed';
        toast.error(error.split('Error: ')[1]);
      })
      .addCase(cartActions.onHandleUpdateCart.pending, (state, action) => {
        state.actions.update = {
          status: 'loading',
          cartId: action.meta.arg.cartId,
        };
      })
      .addCase(cartActions.onHandleUpdateCart.fulfilled, (state, action) => {
        state.actions.update = {
          status: 'succeeded',
          cartId: action.payload.cartId,
        };
        state.cart.data = state.cart.data.map((cart: CartProp) =>
          cart.cartId === action.payload.cartId
            ? { ...cart, quantity: action.payload.quantity }
            : cart
        );
      })
      .addCase(cartActions.onHandleUpdateCart.rejected, (state) => {
        state.actions.update = {
          status: 'failed',
          cartId: null,
        };
        toast.error('Update cart failed');
      })
      .addCase(cartActions.getTotalQuantity.pending, (state) => {
        state.actions.quantity = 'loading';
      })
      .addCase(cartActions.getTotalQuantity.fulfilled, (state, action) => {
        state.actions.quantity = 'succeeded';
        state.cart.totalQuantity = action.payload;
      })
      .addCase(cartActions.getTotalQuantity.rejected, (state) => {
        state.actions.quantity = 'failed';
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
        `${BASE_URL}/carts/${user.data.userId}`,
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
          `${BASE_URL}/carts`,
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
      await ipaCall('DELETE', `${BASE_URL}/carts/${cartId}`, true);
      return cartId;
    }
  ),
  onHandleUpdateCart: createAsyncThunk(
    `${cartSlice.name}/onHandleUpdateCart`,
    async (payload: { cartId: number; quantity: number }) => {
      await ipaCall(
        'PATCH',
        `${BASE_URL}/carts/${payload.cartId}`,
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
      if (Object.keys(user.data).length === 0) {
        return 0;
      }
      const response = await ipaCall(
        'GET',
        `${BASE_URL}/carts/total/${user.data.userId}`,
        true
      );

      return response;
    }
  ),
  onChangeTotalQuantity: createAction<number>(
    `${cartSlice.name}/onChangeTotalQuantity`
  ),
  increaseTotalQuantity: createAction<number>(
    `${cartSlice.name}/increaseTotalQuantity`
  ),
  decreaseTotalQuantity: createAction<number>(
    `${cartSlice.name}/decreaseTotalQuantity`
  ),
  hideCartNotification: createAction(`${cartSlice.name}/hideCartNotification`),
};

// Selectors
export const selectCarts = (state: RootState): any => state.carts.cart;
export const selectCartSelected = (state: RootState): any =>
  state.carts.cartSelected;
export const selectTotalQuantity = (state: RootState): any =>
  state.carts.cart.totalQuantity;
export const selectActions = (state: RootState): any => state.carts.actions;
export const selectShowCartNotification = (state: RootState): any =>
  state.carts.cartNotification;

// Reducer
export default cartSlice.reducer;
