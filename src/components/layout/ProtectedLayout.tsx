//React imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

//External lib imports
import { useAppDispatch } from "@/Hook/hook";
import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";
import type { RootState } from "@/lib/Redux/store";
import { Navigate, Outlet } from "react-router-dom";

//Component imports
import Topbar from "../shared/Topbar";
import LeftSidebar from "../shared/LeftSidebar";
import Bottombar from "../shared/Bottombar";

const ProtectedLayout = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getCurrentUserDataFromDB());
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <div className="w-full md:flex gap-3">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 w-full flex-col min-h-screen overflow-auto">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default ProtectedLayout;
