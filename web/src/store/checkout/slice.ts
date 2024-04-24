import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { BASE_URL, Province_URL } from '../../utils/constants/strapi';
import { ipaCall } from '../../utils/hooks/apiCall';
import type { RootState } from '../root/config.store';
import { selectUser } from '../user/slice';

export interface CheckoutState {
  checkout: {
    data: any[];
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
    add: string;
    delete: string;
    update: string;
  };
}

const initialState: CheckoutState = {
  checkout: {
    data: [],
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
    add: 'idle',
    delete: 'idle',
    update: 'idle',
  },
};

// slice
export const checkoutSlice = createSlice({
  name: 'checkout',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutActions.getCheckouts.pending, (state) => {
        state.checkout.status = 'loading';
      })
      .addCase(checkoutActions.getCheckouts.fulfilled, (state, action) => {
        state.checkout.status = 'succeeded';
        state.checkout.data = action.payload;
      })
      .addCase(checkoutActions.getCheckouts.rejected, (state) => {
        state.checkout.status = 'failed';
      })
      .addCase(checkoutActions.onHandleCheckout.pending, (state) => {
        state.status.add = 'loading';
      })
      .addCase(checkoutActions.onHandleCheckout.fulfilled, (state) => {
        state.status.add = 'succeeded';
        toast.success('Checkout successfully');
      })
      .addCase(checkoutActions.onHandleCheckout.rejected, (state) => {
        state.status.add = 'failed';
        toast.error('Checkout failed');
      })
      .addCase(checkoutActions.getProvince.pending, (state) => {
        state.province.status = 'loading';
      })
      .addCase(checkoutActions.getProvince.fulfilled, (state, action) => {
        state.province.status = 'succeeded';
        state.province.data = action.payload;
      })
      .addCase(checkoutActions.getProvince.rejected, (state) => {
        state.province.status = 'failed';
      })
      .addCase(checkoutActions.getDistrict.pending, (state) => {
        state.district.status = 'loading';
      })
      .addCase(checkoutActions.getDistrict.fulfilled, (state, action) => {
        state.district.status = 'succeeded';
        state.district.data = action.payload;
      })
      .addCase(checkoutActions.getDistrict.rejected, (state) => {
        state.district.status = 'failed';
      })
      .addCase(checkoutActions.getWard.pending, (state) => {
        state.ward.status = 'loading';
      })
      .addCase(checkoutActions.getWard.fulfilled, (state, action) => {
        state.ward.status = 'succeeded';
        state.ward.data = action.payload;
      })
      .addCase(checkoutActions.getWard.rejected, (state) => {
        state.ward.status = 'failed';
      });
  },
});

// Actions
export const checkoutActions = {
  getCheckouts: createAsyncThunk(
    `${checkoutSlice.name}/getCheckouts`,
    async (_, thunkAPI) => {
      const user: any = selectUser(thunkAPI.getState() as RootState);
      const response = await ipaCall(
        'GET',
        `${BASE_URL}checkouts/${user.data.userId}`,
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
          `${BASE_URL}checkouts`,
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
};

// Selectors
export const selectCheckouts = (state: RootState): any =>
  state.checkouts.checkout;
export const selectStatus = (state: RootState): any => state.checkouts.status;
export const selectProvince = (state: RootState): any =>
  state.checkouts.province;
export const selectDistrict = (state: RootState): any =>
  state.checkouts.district;
export const selectWard = (state: RootState): any => state.checkouts.ward;
export const selectProvinceSelected = (state: RootState): any =>
  state.checkouts.provinceSelected;

// Reducer
export default checkoutSlice.reducer;
