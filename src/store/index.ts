import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const persistedState = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState")!)
  : undefined;

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: persistedState,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("authState", JSON.stringify(state.auth));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
