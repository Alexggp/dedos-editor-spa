import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import activities from './reducers/activities';
import areas from './reducers/areas';
import tokens from './reducers/tokens';
import objetives from './reducers/objetives';
import trash from './reducers/trash';
import projects from './reducers/projects';
import user from './reducers/user';
import globalError from './reducers/globalError';
import pairing from './reducers/pairing';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  activities,
  globalError,
  areas,
  tokens,
  objetives,
  projects,
  trash,
  pairing,
  user
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)