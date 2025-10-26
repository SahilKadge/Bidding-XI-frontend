// src/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "./authSlice";

// import other reducers if needed
// import searchReducer from "./features/searchSlice";
// import modalReducer from "./features/modalSlice";
// import exhibitsReducer from "./features/exhibitSlice";

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,

  // search: searchReducer,
  // modal: modalReducer,
  // exhibits: exhibitsReducer,
});

// 2️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// 3️⃣ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);

// 6️⃣ Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
