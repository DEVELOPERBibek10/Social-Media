import type { RootState } from "@/lib/Redux/store";
import { formatRelativeTime } from "@/lib/utils";
import type { Models } from "appwrite";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return;
  }

  return (
    <div className="bg-gray-100 rounded-xl border border-slate-300 px-4 py-3 lg:py-4 w-full max-w-3xl md:max-w-2xl">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3 w-full">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post.creator?.imageUrl || ""}
              alt="profile"
              className="w-14 h-14 rounded-full"
            />
          </Link>
          <div className="flex flex-col justify-center">
            <p className="text-base font-medium leading-[140%] lg:text-lg lg:font-bold text-slate-900">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-1 text-slate-500">
              <p className="text-xs font-semibold leading-[140%] lg:text-sm lg:font-normal text-nowrap">
                {formatRelativeTime(post.$createdAt)} -
              </p>
              <p className="text-xs font-semibold leading-[140%] lg:text-sm lg:font-normal text-nowrap">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        {user?.$id === post.creator.$id && (
          <Link to={`/edit-post/${post.$id}`} className="">
            <img
              src="https://cdn-icons-png.flaticon.com/128/16025/16025454.png"
              alt="Edit"
              className=""
              height={25}
              width={25}
            />
          </Link>
        )}
      </div>
      <Link to={`/post/${post.$id}`}>
        <div className="text-sm font-medium leading-[140%] lg:text-base py-5">
          <p className="">{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: number) => (
              <li
                key={`${tag}-${index}`}
                className="text-slate-600 text-sm font-normal leading-[140%]"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={`${post?.imageUrl}`}
          alt="post-image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-2xl object-cover"
        />
      </Link>
      <div className="w-full flex items-center mt-5">
        <PostStats post={post} userId={user!.$id} />
      </div>
    </div>
  );
};

export default PostCard;
