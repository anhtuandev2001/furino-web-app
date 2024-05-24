import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipaCall } from '../../utils/hooks/apiCall';
import { MAILER_URL } from '../../utils/constants/strapi';
import { RootState } from '../root/config.store';
import { toast } from 'react-hot-toast';

export interface Contact {
  status: string;
}

const initialState: Contact = {
  status: 'idle',
};

// slice
export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactAction.onSend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(contactAction.onSend.fulfilled, (state) => {
        state.status = 'succeeded';
        toast.success('Send message successfully');
      });
  },
});

// Actions
export const contactAction = {
  onSend: createAsyncThunk(
    `${contactSlice.name}/onHandleUpdateCart`,
    async (payload: any) => {
      await ipaCall(
        'POST',
        `${MAILER_URL}/send`,
        false,
        {},
        {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
        }
      );
      return payload;
    }
  ),
};

// Selectors
export const selectContactStatus = (state: RootState) => state.contacts.status;

// Reducer
export default contactSlice.reducer;
