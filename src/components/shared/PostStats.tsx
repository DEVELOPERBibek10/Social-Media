import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";

import { checkedIsLiked } from "@/lib/utils";
import type { Models } from "appwrite";

import { useEffect, useState } from "react";

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
  const [isSaved, setIsSaved] = useState(false);

  const { data: currentUser, isFetching } = useGetCurrentUser();

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let likesArray = [...likes];
    if (likesArray.includes(userId!)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId!);
    }
    likePost({ postId: post.$id, likedArray: likesArray });

    setLikes(() => likesArray);
  };

  const savedPostRecord =
    !isFetching &&
    currentUser?.save?.find((record: Models.Document) => {
      return record?.post?.$id === post.$id;
    });

  useEffect(() => {
    if (!isFetching && currentUser && savedPostRecord) {
      setIsSaved(!!savedPostRecord);
    }
  }, [currentUser, isFetching, savedPostRecord]);

  const handleSavedPost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);

      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId!, postId: post.$id });

    setIsSaved(true);
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
            checkedIsLiked(likes, userId!)
              ? "https://cdn-icons-png.flaticon.com/128/2107/2107845.png"
              : "https://cdn-icons-png.flaticon.com/128/13139/13139183.png"
          }`}
          alt=""
          width={25}
          height={25}
          onClick={(e) => handleLikePost(e)}
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
          onClick={(e) => handleSavedPost(e)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
