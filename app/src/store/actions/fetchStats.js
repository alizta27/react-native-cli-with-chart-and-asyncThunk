import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchStats = createAsyncThunk('stats/fetch', async id => {
  const resonse = await fetch(
    `https://api-generator.retool.com/ELI42D/collection_stats?collection_id=${id}`,
  );
  return resonse.json();
});
export default fetchStats;
