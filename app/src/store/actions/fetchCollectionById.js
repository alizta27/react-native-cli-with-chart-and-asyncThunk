import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchCollectionById = createAsyncThunk('collections/fetch', async id => {
  const resonse = await fetch(
    `https://api-generator.retool.com/j3Iz08/collections/${id}`,
  );
  return resonse.json();
});
export default fetchCollectionById;
