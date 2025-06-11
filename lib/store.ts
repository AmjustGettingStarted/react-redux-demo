import { jsonPlaceholderApi } from "@/services/jsonPlaceHolderApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
});

setupListeners(store.dispatch);
