import { createAsyncThunk } from "@reduxjs/toolkit";
import type { currentUserData } from "@/types";
import { getCurrentUser } from "../Appwrite/api";

export const getCurrentUserDataFromDB = createAsyncThunk<currentUserData, void>(
  "auth/getCurrentUserDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = await getCurrentUser();
      return currentUser as currentUserData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch session.");
      } else {
        return rejectWithValue(error || "Failed to fetch session.");
      }
    }
  }
);
