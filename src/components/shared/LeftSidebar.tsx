import { sidebarLinks } from "@/constants";
import { useSignOutUser } from "@/lib/react-query/queries";
import type { RootState } from "@/lib/Redux/store";
import type { NavLinkType } from "@/types";
import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/Hook/hook";
import { setIsAuth } from "@/features/AuthSlice";

const LeftSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) navigate("/sign-in");
  }, [isSuccess, navigate]);
  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[280px] bg-gray-100">
      <div className="flex flex-col gap-12">
        <Link to="/">
          <h1 className="text-3xl font-bold text-blue-500">NEPABOOK</h1>
        </Link>
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
          {!user?.imageUrl ? (
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <CircleUserRound className="size-full" />
            </div>
          ) : (
            <img
              src={user?.imageUrl as string}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col gap-0.5 items-center">
            <span className="text-[18px] font-bold leading-[140%]">
              {user?.name}
            </span>
            <span className="text-[14px] font-medium text-gray-500 leading-[140%]">
              @{user?.username}
            </span>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: NavLinkType) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`rounded-lg text-lg font-medium leading-[140%] ${
                  !isActive && "hover:bg-blue-200"
                }  transition group ${isActive && "bg-blue-200"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-5 items-center p-3"
                >
                  <img src={link.imgUrl} alt={link.label} className="w-8 h-8" />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="hover:bg-transparent cursor-pointer"
        onClick={() => {
          signOut();
          dispatch(setIsAuth(false));
        }}
      >
        <LogOut className="size-8 text-red-500" />
        <span className="text-sm font-medium leading-[140%] md:text-base">
          Logout
        </span>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
