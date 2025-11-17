import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";

import { checkedIsLiked } from "@/lib/utils";
import type { Models } from "appwrite";

import React, { useMemo } from "react";

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
  const likesList = useMemo(() => {
    return post.liked.map((user: Models.Document) => user.$id);
  }, [post.liked]);

  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const isLiked = checkedIsLiked(likesList, userId);

  const savedPostRecord = currentUser?.save?.find((record: Models.Document) => {
    return record?.post?.$id === post.$id;
  });

  const isSaved = !!savedPostRecord;

  const handleLikePost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likesList];

    if (isLiked) {
      likesArray = likesArray.filter((id) => id !== userId);
    } else {
      likesArray.push(userId);
    }

    try {
      await likePost({ postId: post.$id, likedArray: likesArray });
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleSavedPost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      try {
        await deleteSavedPost(savedPostRecord.$id);
      } catch (error) {
        console.error("Failed to delete saved post:", error);
      }
    } else {
      try {
        await savePost({ userId: userId!, postId: post.$id });
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    }
  };

  return (
    <div
      className={`flex ${
        style_center ? "justify-center" : "justify-between"
      } items-center w-full z-20`}
    >
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            isLiked
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
          {likesList.length}
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
