import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";

import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

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

  const { mutateAsync: likePost, isPending: isLiking } = useLikePost();
  const { mutateAsync: savePost, isPending: isSaving } = useSavePost();
  const { mutateAsync: deleteSavedPost, isPending: isRemovingSave } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const isLiked = checkedIsLiked(likesList, userId);

  const savedPostRecord = currentUser?.save?.find((record: Models.Document) => {
    return record?.post?.$id === post.$id;
  });

  const isSaved = currentUser?.save?.some(
    (rec: Models.Document) => rec.post.$id === post.$id
  );

  const handleLikePost = async (
    e: React.MouseEvent<SVGAElement, MouseEvent>
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
    e: React.MouseEvent<SVGAElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isSaved) {
      try {
        await deleteSavedPost(savedPostRecord!.$id);
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
        {isLiked ? (
          <FaHeart
            className={`${isLiking && "animate-ping"} `}
            onClick={handleLikePost}
            size={24}
            color="red"
          />
        ) : (
          <FaRegHeart
            className={`${isLiking && "animate-ping"} `}
            onClick={handleLikePost}
            size={24}
            color="red"
          />
        )}
        <p
          className={`text-sm font-medium leading-[140%] lg:text-base ${
            style_text_white ? "text-white" : "text-black"
          }`}
        >
          {likesList.length}
        </p>
      </div>
      <div className="flex gap-2">
        {isSaved ? (
          <FaBookmark
            className={`${isRemovingSave && "animate-ping"} `}
            color="skyblue"
            size={24}
            onClick={handleSavedPost}
          />
        ) : (
          <FaRegBookmark
            className={`${isSaving && "animate-ping"} `}
            color="skyblue"
            size={24}
            onClick={handleSavedPost}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
