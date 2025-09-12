import type { currentUserData } from "@/types";

export const InitialUserState = {
  accountId: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export interface currentUserState{
    user:currentUserData | null;
    loading:boolean;
    error:string | null;
}
