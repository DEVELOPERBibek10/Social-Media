import { createAsyncThunk } from "@reduxjs/toolkit";
import { databases } from "../Appwrite/config";
import { getCurrentUser } from "../Appwrite/api";
import { Query } from "appwrite";

export const getCurrentUserDataFromDB = createAsyncThunk<unknown, void>(
  "auth/getCurrentUserDataFromDB",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw Error("Session not found");
      }
      const currentUserDocument = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
        [Query.equal("accountId", currentUser.$id)]
      );
      if (currentUserDocument.total === 0) {
        throw Error("User document not found");
      }
      return currentUserDocument.documents[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch session.");
      } else {
        return rejectWithValue(error || "Failed to fetch session.");
      }
    }
  }
);
