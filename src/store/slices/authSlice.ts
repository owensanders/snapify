import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/state/AuthState";
import { User } from "../../interfaces/auth/LoginResponse";

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: undefined,
    name: undefined,
    email: undefined,
    about: undefined,
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
        about: string | undefined;
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
        about: undefined,
      };
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      state.isAuthenticated = true;
      state.user = {
        ...state.user,
        ...action.payload,
      };

      console.log(state);
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authReducer;
