import { bottombarLinks } from "@/constants";
import type { NavLinkType } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="flex md:hidden justify-between items-center w-full bottom-0 sticky z-50 gap-3 px-1 py-4 bg-gray-200">
      {bottombarLinks.map(({ label, route, imgUrl }: NavLinkType) => {
        const isActive = pathname === route;
        return (
          <Link
            key={`bottombar-${label}`}
            to={route}
            className={`rounded-lg flex flex-col justify-center items-center py-3 px-5 gap-1 transition ${
              isActive && "bg-blue-300 "
            }`}
          >
            <img
              src={imgUrl}
              alt={label}
              width={24}
              height={24}
              className="mx-auto mb-1"
            />
            <span className="text-sm font-medium text-center leading-[140%] text-blue-900">
              {label}
            </span>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
