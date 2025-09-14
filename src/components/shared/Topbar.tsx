import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CircleUserRound, LogOut } from "lucide-react";
import { useSignOutUser } from "@/lib/react-query/queries";
import { useAppDispatch } from "@/Hook/hook";
import { setIsAuth } from "@/features/AuthSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Redux/store";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="w-full sticky top-0 left-0 z-50 md:hidden">
      <div className="flex justify-between items-center py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <h1 className="text-xl font-bold text-blue-500 text-center">
            NEPABOOK
          </h1>
        </Link>
        <div className="flex gap-4 items-center">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent  cursor-pointer"
            onClick={() => {
              signOut();
              dispatch(setIsAuth(false));
            }}
          >
            <LogOut className="size-8 text-red-500" />
          </Button>
          <Link to={`/profile/${user?._id}`}>
            {!user?.imageUrl ? (
              <div className="w-10 h-10 rounded-full bg-muted-foreground">
                <CircleUserRound className="size-full" />
              </div>
            ) : (
              <img
                src={user?.imageUrl as string}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
