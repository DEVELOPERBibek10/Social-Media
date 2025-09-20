import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useDeletePost, useGetPostById } from "@/lib/react-query/queries";
import type { RootState } from "@/lib/Redux/store";
import { formatRelativeTime } from "@/lib/utils";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(postId);
  const { user } = useSelector((state: RootState) => state.auth);
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();

  function handelDeletePost() {
    deletePost({ postId: post!.$id, imageId: post!.imageId });
    navigate("/");
  }

  return (
    <section className="flex flex-col flex-1 gap-10 overflow-auto py-10 px-5 md:p-14 items-center">
      {isPostLoading || !post ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loader w={54} h={54} />
        </div>
      ) : (
        <div className="bg-gray-200 w-full max-w-5xl rounded-[30px] flex flex-col lg:flex-row border border-slate-300 rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            alt="post image"
            className="h-80 lg:h-[480px] xl:w-[50%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5"
          />

          <div className="bg-gray-200 flex flex-col gap-5 lg:gap-7 flex-1 items-start p-5 rounded-[30px]">
            <div className="flex items-center justify-between w-full">
              <Link
                to={`/profile/${post.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post.creator?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-[44px] lg:h-[44px] rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-[140%] lg:text-lg lg:font-bold text-slate-900 ">
                    {post.creator.name}
                  </p>

                  <div className="flex justify-start items-center gap-2 text-slate-600">
                    <p className="text-xs font-semibold leading-[140%] lg:text-sm lg:font-normal text-nowrap">
                      {formatRelativeTime(post.$createdAt)} -
                    </p>

                    <p className="text-xs font-semibold leading-[140%] lg:text-sm md:font-normal w-[55%] truncate lg:w-full lg:overflow-visible lg:whitespace-normal lg:text-ellipsis-none">
                      {post.location}
                    </p>
                  </div>
                </div>
              </Link>
              {user?.$id === post?.creator.$id && (
                <div className="flex justify-center items-center lg:gap-4">
                  <Link to={`/edit-post/${post.$id}`} className="shrink-0">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/16025/16025454.png"
                      alt="Edit"
                      className="w-[25px]"
                      height={25}
                      width={25}
                    />
                  </Link>

                  <Button
                    variant={"ghost"}
                    onClick={handelDeletePost}
                    className="hover:bg-transparent cursor-pointer"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                      alt=""
                      className=""
                      height={24}
                      width={24}
                    />
                  </Button>
                </div>
              )}
            </div>
            <hr className="border border-slate-300 w-full" />
            <div className="flex flex-col felx-1 w-full text-sm font-medium leading-[140%] lg:text-base">
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
            <div className="w-full">
              <PostStats post={post} userId={user!.$id} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
