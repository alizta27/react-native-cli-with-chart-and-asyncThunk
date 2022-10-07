import {createSlice} from '@reduxjs/toolkit';
import {initialState} from '../satate';
import fetchCollections from '../actions/fetchCollections.js';

export const counterSlice = createSlice({
  name: 'collectionsReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.status = null;
    });
    builder.addCase(fetchCollections.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchCollections.rejected, state => {
      state.status = 'error';
    });
  },
});

export default counterSlice.reducer;
