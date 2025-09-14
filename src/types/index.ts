import type { Models } from "appwrite";

export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  accountId: string;
  name: string;
  username?: string;
  email: string;
  imageUrl: URL | string;
}

export interface currentUserData extends Models.Document {
  bio?: string;
  imageId?: string;
  accountId: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL | string;
}

export interface NavLinkType {
  label: string;
  route: string;
  imgUrl: string;
}
