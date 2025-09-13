import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";
import type { currentUserData } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const InitialUserState = {
  accountId: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export interface currentUserState {
  user: currentUserData | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

export const initialState: currentUserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: JSON.parse(localStorage.getItem("isAuth")! || "false"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserDataFromDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCurrentUserDataFromDB.fulfilled,
        (state, action: PayloadAction<currentUserData>) => {
          state.loading = false;
          state.user = {
            ...action.payload,
            imageUrl: action.payload.imageUrl.toString(),
          };
          state.error = null;
        }
      )
      .addCase(getCurrentUserDataFromDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});
export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
