import type { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface UserCardProps {
  user: Models.Document;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="flex items-center flex-col gap-4 rounded-[20px] px-5 py-8 w-full border border-slate-400/30"
    >
      <img
        src={
          user?.imageUrl ||
          "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
        }
        alt="user"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-base font-medium leading-[140%] text-slate-900 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-sm leading-[140%] text-slate-500 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>
      <Button
        type="button"
        size={"sm"}
        className="bg-blue-500 hover:bg-blue-600 px-5 py-3 cursor-pointer"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
