import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-hot-toast';
import { BASE_URL, Province_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { selectUser } from '../user/slice';

export interface CheckoutState {
  orders: {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  order: {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  province: {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  district: {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  ward: {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  provinceSelected: {
    province?: {
      provinceId: number;
      provinceName: string;
    };
    district?: {
      districtId: number;
      districtName: string;
    };
    ward?: {
      wardId: number;
      wardName: string;
    };
  };
  status: {
    checkout: string;
    update: string;
  };
  statusId: number;
}

const initialState: CheckoutState = {
  orders: {
    data: [],
    status: 'idle',
    error: null,
  },
  order: {
    data: {},
    status: 'idle',
    error: null,
  },
  province: {
    data: [],
    status: 'idle',
    error: null,
  },
  district: {
    data: [],
    status: 'idle',
    error: null,
  },
  ward: {
    data: [],
    status: 'idle',
    error: null,
  },
  provinceSelected: {
    province: undefined,
    district: undefined,
    ward: undefined,
  },
  status: {
    checkout: 'idle',
    update: 'idle',
  },
  statusId: 0,
};

// slice
export const checkoutSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    onHandleChangeProvince(state, action) {
      state.provinceSelected.province = {
        provinceId: action.payload.province_id,
        provinceName: action.payload.label,
      };
    },
    onHandleChangeDistrict(state, action) {
      state.provinceSelected.district = {
        districtId: action.payload.district_id,
        districtName: action.payload.label,
      };
    },
    onHandleChangeWard(state, action) {
      state.provinceSelected.ward = {
        wardId: action.payload.ward_id,
        wardName: action.payload.label,
      };
    },
    clearStatus(state) {
      state.status.checkout = 'idle';
      state.status.update = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderActions.getOrders.pending, (state) => {
        state.orders.status = 'loading';
      })
      .addCase(orderActions.getOrders.fulfilled, (state, action) => {
        state.orders.status = 'succeeded';
        state.orders.data = action.payload;
      })
      .addCase(orderActions.getOrders.rejected, (state) => {
        state.orders.status = 'failed';
      })
      .addCase(orderActions.getProvince.pending, (state) => {
        state.province.status = 'loading';
      })
      .addCase(orderActions.getProvince.fulfilled, (state, action) => {
        state.province.status = 'succeeded';
        state.province.data = action.payload;
      })
      .addCase(orderActions.getProvince.rejected, (state) => {
        state.province.status = 'failed';
      })
      .addCase(orderActions.getDistrict.pending, (state) => {
        state.district.status = 'loading';
      })
      .addCase(orderActions.getDistrict.fulfilled, (state, action) => {
        state.district.status = 'succeeded';
        state.district.data = action.payload;
      })
      .addCase(orderActions.getDistrict.rejected, (state) => {
        state.district.status = 'failed';
      })
      .addCase(orderActions.getWard.pending, (state) => {
        state.ward.status = 'loading';
      })
      .addCase(orderActions.getWard.fulfilled, (state, action) => {
        state.ward.status = 'succeeded';
        state.ward.data = action.payload;
      })
      .addCase(orderActions.getWard.rejected, (state) => {
        state.ward.status = 'failed';
      })
      .addCase(orderActions.onHandleCheckout.pending, (state) => {
        state.status.checkout = 'loading';
      })
      .addCase(orderActions.onHandleCheckout.fulfilled, (state) => {
        state.status.checkout = 'succeeded';
      })
      .addCase(orderActions.onHandleCheckout.rejected, (state) => {
        state.status.checkout = 'failed';
        toast.error('Order failed! Please try again!');
      })
      .addCase(orderActions.onChangeStatusId, (state, action) => {
        state.statusId = action.payload;
      })
      .addCase(orderActions.getOrder.pending, (state) => {
        state.order.status = 'loading';
      })
      .addCase(orderActions.getOrder.fulfilled, (state, action) => {
        state.order.status = 'succeeded';
        state.order.data = action.payload;
      })
      .addCase(orderActions.getOrder.rejected, (state) => {
        state.order.status = 'failed';
      })
      .addCase(orderActions.onChangeStatusOrder.pending, (state) => {
        state.status.update = 'loading';
      })
      .addCase(orderActions.onChangeStatusOrder.fulfilled, (state) => {
        state.status.update = 'succeeded';
        toast.success('Update status successfully!');
      })
      .addCase(orderActions.onChangeStatusOrder.rejected, (state) => {
        state.status.update = 'failed';
        toast.error('Update status failed! Please try again!');
      });
  },
});

// Actions
export const orderActions = {
  getOrders: createAsyncThunk(
    `${checkoutSlice.name}/getOrders`,
    async (_, thunkAPI) => {
      const user: any = selectUser(thunkAPI.getState() as RootState);
      const statusId: any = selectStatusId(thunkAPI.getState() as RootState);
      const response = await ipaCall(
        'GET',
        `${BASE_URL}/orders/${user.data.userId}/${statusId}`,
        true
      );

      return response;
    }
  ),
  getOrder: createAsyncThunk(
    `${checkoutSlice.name}/getOrder`,
    async (orderId: number) => {
      const response = await ipaCall(
        'GET',
        `${BASE_URL}/orders/order/${orderId}`,
        true
      );
      return response;
    }
  ),
  getProvince: createAsyncThunk(
    `${checkoutSlice.name}/getProvince`,
    async () => {
      const response = await ipaCall('GET', `${Province_URL}`, false);
      return response.results;
    }
  ),
  getDistrict: createAsyncThunk(
    `${checkoutSlice.name}/getDistrict`,
    async (_payload, thunkAPI) => {
      const provinceSelected = selectProvinceSelected(
        thunkAPI.getState() as RootState
      );

      const response = await ipaCall(
        'GET',
        `${Province_URL}/district/${provinceSelected.province?.provinceId}`,
        false
      );
      return response.results;
    }
  ),
  getWard: createAsyncThunk(
    `${checkoutSlice.name}/getWard`,
    async (_payload, thunkAPI) => {
      const provinceSelected = selectProvinceSelected(
        thunkAPI.getState() as RootState
      );
      const response = await ipaCall(
        'GET',
        `${Province_URL}/ward/${provinceSelected.district?.districtId}`,
        false
      );
      return response.results;
    }
  ),
  onHandleChangeProvince: createAction<{
    province_id: number;
    label: string;
  }>(`${checkoutSlice.name}/onHandleChangeProvince`),
  onHandleChangeDistrict: createAction<{
    district_id: number;
    label: string;
  }>(`${checkoutSlice.name}/onHandleChangeDistrict`),
  onHandleChangeWard: createAction<{
    ward_id: number;
    label: string;
  }>(`${checkoutSlice.name}/onHandleChangeWard`),
  onHandleCheckout: createAsyncThunk(
    `${checkoutSlice.name}/onHandleCheckout`,
    async (
      payload: {
        address: string;
        province: string;
        district: string;
        ward: string;
        phone: string;
        carts: number[];
        firstName: string;
        lastName: string;
        save: boolean;
      },
      thunkAPI
    ) => {
      try {
        const user: any = selectUser(thunkAPI.getState() as RootState);
        const response = await ipaCall(
          'POST',
          `${BASE_URL}/orders`,
          true,
          {},
          {
            userId: user.data.userId,
            address: payload.address,
            province: payload.province,
            district: payload.district,
            ward: payload.ward,
            phone: payload.phone,
            carts: payload.carts,
            firstName: payload.firstName,
            lastName: payload.lastName,
            save: payload.save,
          }
        );
        return response;
      } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message.toString());
      }
    }
  ),
  onChangeStatusId: createAction<number>(
    `${checkoutSlice.name}/onChangeStatusId`
  ),
  onChangeStatusOrder: createAsyncThunk(
    `${checkoutSlice.name}/onChangeStatusOrder`,
    async (payload: { orderId: number; status: number }) => {
      const response = await ipaCall(
        'PATCH',
        `${BASE_URL}/orders`,
        true,
        {},
        {
          status: payload.status,
          orderId: payload.orderId,
        }
      );
      return response;
    }
  ),
  clearStatus: createAction(`${checkoutSlice.name}/clearStatus`),
};

// Selectors
export const selectOrders = (state: RootState): any => state.checkouts.orders;
export const selectOrder = (state: RootState): any => state.checkouts.order;
export const selectStatus = (state: RootState): any => state.checkouts.status;
export const selectProvince = (state: RootState): any =>
  state.checkouts.province;
export const selectDistrict = (state: RootState): any =>
  state.checkouts.district;
export const selectWard = (state: RootState): any => state.checkouts.ward;
export const selectProvinceSelected = (state: RootState): any =>
  state.checkouts.provinceSelected;
export const selectStatusCheckout = (state: RootState): any =>
  state.checkouts.status.checkout;
export const selectStatusId = (state: RootState): any =>
  state.checkouts.statusId;

// Reducer
export default checkoutSlice.reducer;
