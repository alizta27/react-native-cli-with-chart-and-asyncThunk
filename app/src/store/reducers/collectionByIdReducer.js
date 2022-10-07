import {createSlice} from '@reduxjs/toolkit';
import fetchCollectionById from '../actions/fetchCollectionById';
import {initialState} from '../satate';

export const counterSlice = createSlice({
  name: 'collectionById',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
      state.collection = action.payload;
      state.status = null;
    });
    builder.addCase(fetchCollectionById.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchCollectionById.rejected, state => {
      state.status = 'error';
    });
  },
});

export default counterSlice.reducer;
