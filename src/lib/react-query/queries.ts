import type { NewPost, NewUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  getRecentPost,
  signInUser,
  signOutUser,
} from "../Appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationKey: ["create-user-account"],
    mutationFn: (user: NewUser) => createUserAccount(user),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationKey: ["sign-in-user"],
    mutationFn: (credentials: { email: string; password: string }) =>
      signInUser(credentials),
  });
};

export const useSignOutUser = () => {
  return useMutation({
    mutationKey: ["sign-out-user"],
    mutationFn: () => signOutUser(),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: NewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POST],
      });
    },
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POST],
    queryFn: getRecentPost,
  });
};
