/**
 * @description redux 入口
 * @time 2020/1/8
 * @author Aiden
 */
import { configureStore } from '@reduxjs/toolkit';
// redux-persist
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist'
// storage
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

export type RootState = ReturnType<typeof reducers>

// creact persist reducer
const persistConfig = getPersistConfig({
  key: 'root',
  storage,
  blacklist: [],
  rootReducer: reducers
});
const persistedReducer = persistReducer(persistConfig, reducers);
// create store
const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
export default store
