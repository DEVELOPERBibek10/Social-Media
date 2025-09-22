import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import type { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const savedPost = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        name: currentUser?.name,
        imageUrl: currentUser?.imageUrl,
      },
    }))
    .reverse();
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
      {!currentUser ? (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <Loader w={50} h={50} />
        </div>
      ) : (
        <ul className="w-full flex  gap-9 ">
          {!savedPost?.length ? (
            <p className="text-slate-400 text-center">No posts to show</p>
          ) : (
            <GridPostList posts={savedPost} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
