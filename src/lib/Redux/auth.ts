import { createAsyncThunk } from "@reduxjs/toolkit";
import { databases } from "../Appwrite/config";
import { getCurrentUser } from "../Appwrite/api";
import { Query } from "appwrite";
import type { currentUserData } from "@/types";

export const getCurrentUserDataFromDB = createAsyncThunk<currentUserData, void>(
  "auth/getCurrentUserDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw Error("Session not found");
      }
      const currentUserDocuments = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
        [Query.equal("accountId", currentUser.$id)]
      );
      if (currentUserDocuments.total === 0) {
        throw Error("User document not found");
      }

      return currentUserDocuments.documents[0] as currentUserData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch session.");
      } else {
        return rejectWithValue(error || "Failed to fetch session.");
      }
    }
  }
);
