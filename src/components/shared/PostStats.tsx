import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";

import { checkedIsLiked } from "@/lib/utils";
import type { Models } from "appwrite";

import React, { useEffect, useState } from "react";

interface PostStatsProps {
  post: Models.Document;
  userId: string;
  style_center?: boolean;
  style_text_white?: boolean;
}
const PostStats = ({
  post,
  userId,
  style_center = false,
  style_text_white = false,
}: PostStatsProps) => {
  const likesList = post.liked.map((user: Models.Document) => user.$id);

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavedPost();

  const [likes, setLikes] = useState<string[]>(likesList);
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save?.find((record: Models.Document) => {
    return record?.post?.$id === post.$id;
  });
  const [isSaved, setIsSaved] = useState<boolean>(!!savedPostRecord);

  const handleLikePost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];
    const isLiked = likesArray.includes(userId!);

    if (isLiked) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId!);
    }

    setLikes(likesArray);

    try {
      await likePost({ postId: post.$id, likedArray: likesArray });
    } catch (error) {
      setLikes(likesList);
      console.error("Failed to like post:", error);
    }
  };

  const handleSavedPost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const prev = isSaved;

    if (savedPostRecord) {
      setIsSaved(false);
      try {
        await deleteSavedPost(savedPostRecord.$id);
      } catch (error) {
        setIsSaved(prev);
        console.error("Failed to delete saved post:", error);
      }
    } else {
      setIsSaved(true);
      try {
        await savePost({ userId: userId!, postId: post.$id });
      } catch (error) {
        setIsSaved(prev);
        console.error("Failed to save post:", error);
      }
    }
  };
  // ...existing code...
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [savedPostRecord]);

  useEffect(() => {
    if (likesList) {
      setLikes(likesList);
    }
  }, [likesList]);

  return (
    <div
      className={`flex ${
        style_center ? "justify-center" : "justify-between"
      } items-center w-full z-20`}
    >
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkedIsLiked(likes, userId!)
              ? "https://cdn-icons-png.flaticon.com/128/2107/2107845.png"
              : "https://cdn-icons-png.flaticon.com/128/13139/13139183.png"
          }`}
          alt=""
          width={25}
          height={25}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p
          className={`text-sm font-medium leading-[140%] lg:text-base ${
            style_text_white ? "text-white" : "text-black"
          }`}
        >
          {likes.length}
        </p>
      </div>
      <div className="flex gap-2">
        <img
          src={`${
            isSaved
              ? "https://cdn-icons-png.flaticon.com/128/4942/4942550.png"
              : "https://cdn-icons-png.flaticon.com/128/10335/10335589.png"
          }`}
          alt=""
          width={25}
          height={25}
          onClick={handleSavedPost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
