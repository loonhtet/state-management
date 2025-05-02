import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./slices/teamSlice";
import playerReducer from "./slices/playerSlice";
import { persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    teams: persistedReducer,
    players: playerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
