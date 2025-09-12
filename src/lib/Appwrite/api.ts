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
    return error;
  }
}
