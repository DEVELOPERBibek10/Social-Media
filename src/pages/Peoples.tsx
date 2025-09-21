import { useGetUsers } from "@/lib/react-query/queries";
import type { RootState } from "@/lib/Redux/store";
import Loader from "@/components/shared/Loader";
import { useSelector } from "react-redux";
import UserCard from "@/components/shared/UserCard";

const Peoples = () => {
  const {
    data: users,
    isLoading: isUserListLoading,
    isError: isUserError,
  } = useGetUsers(10);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex flex-col flex-1 items-center overflow-y-auto overflow-x-hidden py-10 px-5 md:p-14 w-full">
      <div className="mx-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-2xl font-bold leading-[140%] tracking-tighter md:text-3xl w-full">
          All Users
        </h2>
        {isUserListLoading && !users ? (
          <div className="min-h-[75vh] flex items-center">
            <Loader w={44} h={44} />
          </div>
        ) : (
          !isUserError && (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {users?.documents.map(
                (creator) =>
                  creator.$id !== currentUser?.$id && (
                    <li key={creator?.$id} className="">
                      <UserCard user={creator} />
                    </li>
                  )
              )}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default Peoples;
