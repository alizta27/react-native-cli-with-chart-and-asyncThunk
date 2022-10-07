import {createSlice} from '@reduxjs/toolkit';
import {initialState} from '../satate';
import fetchWalletContents from '../actions/fetchWalletCollections';

export const counterSlice = createSlice({
  name: 'walletReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWalletContents.fulfilled, (state, action) => {
      state.walletContents = action.payload;
      state.status = null;
    });
    builder.addCase(fetchWalletContents.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchWalletContents.rejected, state => {
      state.status = 'error';
    });
  },
});

export default counterSlice.reducer;
