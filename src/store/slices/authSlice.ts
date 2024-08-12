import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/state/AuthState";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: undefined,
    name: undefined,
    email: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        id: number | undefined;
        name: string | undefined;
        email: string | undefined;
      }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {
        id: undefined,
        name: undefined,
        email: undefined,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authReducer;
