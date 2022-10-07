import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchCollections = createAsyncThunk('collections/fetch', async () => {
  const resonse = await fetch(
    'https://api-generator.retool.com/j3Iz08/collections',
  );
  return resonse.json();
});
export default fetchCollections;
