import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { authApi } from "../api/user";
import { blogApi } from "../api/blog";
import { commentApi } from "../api/comments";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});
const middleware = [
  authApi.middleware,
  blogApi.middleware,
  commentApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
