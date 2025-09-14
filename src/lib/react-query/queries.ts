import type { NewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInUser, signOutUser } from "../Appwrite/api";

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
