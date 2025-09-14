import { sidebarLinks } from "@/constants";
import type { RootState } from "@/lib/Redux/store";
import type { NavLinkType } from "@/types";
import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const LeftSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[280px] bg-gray-100">
      <div className="flex flex-col gap-12">
        <Link to="/">
          <h1 className="text-3xl font-bold text-blue-500">NEPABOOK</h1>
        </Link>
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
          {!user?.imageUrl ? (
            <div className="w-12 h-12 rounded-full bg-muted-foreground">
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
          {sidebarLinks.map((link: NavLinkType) => (
            <li
              key={link.label}
              className="rounded-lg text-lg font-medium leading-[140%] hover:bg-blue-200 transition group"
            >
              <NavLink to={link.route} className="flex gap-5 items-center p-3">
                <img src={link.imgUrl} alt={link.label} className="w-8 h-8" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
