import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { useGetRecentPost, useGetUsers } from "@/lib/react-query/queries";
import type { RootState } from "@/lib/Redux/store";
import type { Models } from "appwrite";
import { useSelector } from "react-redux";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isPostError,
  } = useGetRecentPost();
  const {
    data: users,
    isLoading: isUserListLoading,
    isError: isUserError,
  } = useGetUsers(10);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  if (!isPostError) {
    return (
      <>
        <main className="flex flex-1 w-full md:w-[96.5%]">
          <div className="flex flex-col flex-1 items-center gap-10  py-10 px-5 md:px-8 lg:p-14">
            <div className="flex flex-1 flex-col items-center w-full gap-6 md:gap-9">
              <h3 className="text-2xl flex flex-1 justify-center w-full font-bold leading-[140%] mx-auto tracking-tighter">
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
            <h3 className="text-2xl font-bold leading-[140%] tracking-tighter text-center">
              Top Creators
            </h3>
            {isUserListLoading && !users ? (
              <div className="h-full flex items-center">
                <Loader w={44} h={44} />
              </div>
            ) : (
              !isUserError && (
                <ul className="grid lg:grid-cols-2 place-content-center gap-6">
                  {users?.documents.map(
                    (creator) =>
                      creator.$id !== currentUser?.$id && (
                        <li key={creator?.$id} className="flex justify-center">
                          <UserCard user={creator} />
                        </li>
                      )
                  )}
                </ul>
              )
            )}
          </div>
        </main>
      </>
    );
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <img
        src="https://cdn-icons-png.flaticon.com/128/753/753345.png"
        width={62}
        height={62}
        alt="Error"
      />
      <p className="text-2xl font-bold">Something went wrong</p>
    </div>
  );
};

export default Home;
