import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPost } from "@/lib/react-query/queries";
import type { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError } = useGetRecentPost();

  if (!isError) {
    return (
      <>
        <main className="flex flex-1 w-full md:w-[96.5%]">
          <div className="flex flex-col flex-1 items-center gap-10  py-10 px-5 md:px-8 lg:p-14">
            <div className="flex flex-1 flex-col items-center w-full gap-6 md:gap-9">
              <h3 className="text-2xl flex flex-1 justify-center md:justify-start w-full md:w-[68%] font-bold leading-[140%] mx-auto tracking-tighter">
                Home Feed
              </h3>
              {isPostLoading ? (
                <div className="w-full min-h-screen flex items-center justify-center">
                  <Loader w={54} h={54} />
                </div>
              ) : !posts?.total ? (
                <div className="min-h-screen w-full flex justify-center items-center">
                  <span className="text-xl md:text-3xl font-medium">
                    No posts available
                  </span>
                </div>
              ) : (
                <ul className="flex flex-1 flex-col gap-10 w-full ">
                  {posts?.documents.map((post: Models.Document) => (
                    <li key={post.$id} className="flex justify-center w-full">
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="hidden md:flex flex-col w-64 xl:w-[465px] px-6 py-16 gap-10 overflow-auto ">
            <h3 className="text-2xl font-bold leading-[140%] tracking-tighter mx-auto">
              Top Creators
            </h3>
          </div>
        </main>
      </>
    );
  }
  return;
};

export default Home;
