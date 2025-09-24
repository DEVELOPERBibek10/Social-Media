import type { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Redux/store";

interface GridPostListProps {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
}

const GridPostList = ({
  posts,
  showStats = true,
  showUser = true,
}: GridPostListProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return;
  }
  return (
    <ul className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-7xl">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link
            to={`/post/${post.$id}`}
            className="flex rounded-3xl border-slate-400 overflow-hidden cursor-pointer w-full h-full"
          >
            <img
              src={post.imageUrl}
              alt="post-image"
              className="h-full w-full object-cover"
            />
          </Link>
          <div
            className={`absolute bottom-0 p-4 ${
              showStats || (showUser && "bg-black/30")
            } flex items-center  justify-between w-full rounded-b-3xl gap-2`}
          >
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold">
                  {post.creator.name}
                </span>
              </div>
            )}
            {showStats && (
              <div>
                <PostStats
                  post={post}
                  userId={user!.$id}
                  style_center={true}
                  style_text_white={true}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
