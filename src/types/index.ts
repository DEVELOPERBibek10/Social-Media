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

export interface currentUserData extends UserData {
  bio: string;
}
