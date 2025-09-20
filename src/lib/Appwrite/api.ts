import type {
  currentUserData,
  NewPost,
  NewUser,
  UpdatePost,
  UserData,
} from "@/types";
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
    const currentUser = await account.get();
    if (!currentUser) {
      throw Error("Session not found");
    }
    const currentUserDocuments = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
      [Query.equal("accountId", currentUser.$id)]
    );

    if (currentUserDocuments.total === 0) {
      throw Error("User document not found");
    }

    return currentUserDocuments.documents[0] as currentUserData;
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

export async function postReaction(postId: string, likedArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        liked: [...likedArray],
      }
    );
    if (!updatedPost) throw Error("Post does not exist");
    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function savePost(userId: string, postId: string) {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (savedPost.total === 0) throw Error("Post is not saved");
    return savedPost;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );
    return { status: "ok" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}

export async function getPostById(postId?: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId!
    );
    if (!post) throw Error(`No post found with id: ${postId}`);
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePost(post: UpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl ? post.imageUrl : "",
      imageId: post.imageId,
    };
    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        const deletion = await deleteFile(uploadedFile.$id);
        if (!deletion) throw Error;
        throw Error;
      }
      image = { ...image, imageId: uploadedFile.$id, imageUrl: fileUrl! };
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //Update Post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );
    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw Error;
    }
    if (hasFileToUpdate) await deleteFile(post.imageId);

    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;
  console.log("Hello");
  try {
    const status = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId!
    );
    if (!status) throw Error;

    const deletion = await deleteFile(imageId!);
    if (!deletion) throw Error;

    return { status: "OK" };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getInfinitePosts({
  pageParam,
}: {
  pageParam: string | null;
}) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(6)];
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}
