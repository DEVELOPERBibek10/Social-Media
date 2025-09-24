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
  save: Models.Document[];
  likes: Models.Document[];
}

export interface NavLinkType {
  label: string;
  route: string;
  imgUrl: string;
}

export interface NewPost {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export interface UpdatePost {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
}

export interface UpdateUser {
  userId: string;
  name: string;
  imageId: string;
  email?: string;
  username?: string;
  imageUrl: URL | string;
  bio: string;
  file: File[];
}
