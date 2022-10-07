import {createSlice} from '@reduxjs/toolkit';
import {initialState} from '../satate';
import fetchStats from '../actions/fetchStats';

export const counterSlice = createSlice({
  name: 'statsReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStats.fulfilled, (state, action) => {
      state.stats = action.payload;
      state.status = null;
    });
    builder.addCase(fetchStats.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchStats.rejected, state => {
      state.status = 'error';
    });
  },
});

export default counterSlice.reducer;
