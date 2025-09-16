import type { NewPost, NewUser, UserData } from "@/types";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  ID,
  storage,
} from "./config";
import { Query } from "appwrite";

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

export async function createPost(post: NewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      const deletion = await deleteFile(uploadedFile.$id);
      if (!deletion) throw Error;
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags: tags,
        location: post.location,
      }
    );

    if (!newPost) {
      const deletion = await deleteFile(uploadedFile.$id);
      if (!deletion) throw Error;
    }
    return newPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFileView(appwriteConfig.bucketId, fileId);

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteFile(fileId: string) {
  try {
    const deletion = await storage.deleteFile(appwriteConfig.bucketId, fileId);
    if (!deletion) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getRecentPost() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}
