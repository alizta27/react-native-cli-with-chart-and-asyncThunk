import {configureStore, combineReducers} from '@reduxjs/toolkit';
import collectionsReducer from './reducers/collectionsReducer';
import walletReducer from './reducers/walletReducer';
import statsReducer from './reducers/statsReducer';
import collectionByIdReducer from './reducers/collectionByIdReducer';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  collectionsReducer,
  walletReducer,
  statsReducer,
  collectionByIdReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
