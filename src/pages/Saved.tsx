import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { getUserById } from "@/lib/Appwrite/api";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import type { Models } from "appwrite";
import { useEffect, useState } from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const [savedPost, setSavedPost] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!currentUser?.save) {
        setSavedPost([]);
        setIsLoading(false);
        return;
      }

      try {
        const posts = await Promise.all(
          currentUser.save.map(async (savePost: Models.Document) => {
            const creator = await getUserById(savePost?.post?.creator);

            return {
              ...savePost.post,
              creator: {
                name: creator?.name || "Unknown",
                imageUrl: creator?.imageUrl || savePost?.post?.imageUrl,
              },
            };
          })
        );
        setSavedPost(posts.reverse());
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
        setSavedPost([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedPosts();
  }, [currentUser?.save]);
  
  return (
    <div className="flex flex-col flex-1 items-center overflow-auto py-10 px-5 md:p-14 gap-10">
      <div className="flex w-full gap-2 ">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4942/4942550.png"
          alt="save"
          width={36}
          height={36}
        />
        <h2 className="text-2xl font-bold leading-[140%] tracking-tighter md:text-3xl w-full">
          Saved Post
        </h2>
      </div>
      {isLoading ? (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <Loader w={50} h={50} />
        </div>
      ) : (
        <ul className="w-full min-h-[70vh] gap-9 ">
          {!savedPost?.length ? (
            <p className=" font-semibold text-2xl text-center mt-52">
              No posts to show
            </p>
          ) : (
            <GridPostList posts={savedPost} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
