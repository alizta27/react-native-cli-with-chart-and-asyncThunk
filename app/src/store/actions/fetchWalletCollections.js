import {createAsyncThunk} from '@reduxjs/toolkit';

const fetchWalletContents = createAsyncThunk(
  'walletContents/fetch',
  async () => {
    const resonse = await fetch(
      'https://api-generator.retool.com/jlEsLB/wallet_content',
    );
    return resonse.json();
  },
);
export default fetchWalletContents;
