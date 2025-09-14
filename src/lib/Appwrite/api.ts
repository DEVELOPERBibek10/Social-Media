import type { NewUser, UserData } from "@/types";
import { account, appwriteConfig, avatars, databases, ID } from "./config";

export async function createUserAccount(user: NewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account not created");
    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      name: user.name,
      email: user.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDatabase(user: UserData) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    if (!newUser) throw new Error("User not created in database");
    return newUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signInUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(
      credentials.email,
      credentials.password
    );
    if (!session) throw new Error("Unable to create session");
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    if (!user) throw new Error("No user logged in");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutUser() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
}
