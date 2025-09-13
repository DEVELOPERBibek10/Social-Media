import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("isAuth", JSON.stringify(state.auth.isAuth));
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
