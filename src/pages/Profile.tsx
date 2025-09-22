import Loader from "@/components/shared/Loader";
import StatBlock from "@/components/shared/StatBlock";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/lib/react-query/queries";
import type { RootState } from "@/lib/Redux/store";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const { data: currentUser, isFetching } = useGetUserById(userId || "");
  const user = useSelector((state: RootState) => state.auth.user);

  if (isFetching || !currentUser || !user) {
    return (
      <div className="flex w-full min-h-[70vh] items-center justify-center">
        <Loader w={50} h={50} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-auto py-10 px-5 md:p-14 ">
      <div className="flex items-center md:mb-8 lg:items-start gap-8 flex-col lg:flex-row relative w-full max-w-[70vw]">
        <div className="flex lg:flex-row flex-col max-lg:items-center flex-1 gap-5">
          <img
            src={
              currentUser.imageUrl ||
              "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
            }
            alt="profile"
            className="w-28 h-28 lg:h-32 lg:w-32 rounded-full"
          />

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col my-auto w-full">
              <h1 className="text-center lg:text-left text-2xl font-bold leading-[140%] tracking-tighter md:text-4xl">
                {currentUser.name}
              </h1>
              <p className="text-slate-600 text-sm leading-[140%] md:text-lg md:font-medium">
                @{currentUser.username}
              </p>
            </div>
            <div className="flex gap-8 items-center mt-6 justify-center lg:justify-start flex-wrap">
              <StatBlock value={currentUser.posts.length} label={"Posts"} />
              <StatBlock value={20} label={"Followers"} />
              <StatBlock value={2} label={"Following"} />
            </div>
            <p className="text-sm font-medium leading-[140%] md:text-base text-center lg:text-left mt-5 max-w-screen">
              {currentUser.bio}
            </p>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            {currentUser.$id === user.$id && (
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className="h-12 bg-gray-200 px-5 text-slate-900 flex justify-center items-center gap-2 rounded-lg"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/16025/16025454.png"
                  alt="Edit"
                  height={25}
                  width={25}
                />
                <span className="whitespace-nowrap text-sm font-medium leading-[140%]">
                  Edit Profile
                </span>
              </Link>
            )}
            {currentUser.$id !== user.$id && (
              <Button
                type="button"
                className="bg-blue-500 px-8 hover:bg-blue-600 cursor-pointer"
              >
                Follow
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
