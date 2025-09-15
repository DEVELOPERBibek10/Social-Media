//React imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

//External lib imports
import { useAppDispatch } from "@/Hook/hook";
import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";
import type { RootState } from "@/lib/Redux/store";
import { Outlet, useNavigate } from "react-router-dom";

//Component imports
import Topbar from "../shared/Topbar";
import LeftSidebar from "../shared/LeftSidebar";
import Bottombar from "../shared/Bottombar";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    const cookieFallback = JSON.parse(
      localStorage.getItem("cookieFallback") || "[]"
    );
    if (
      (cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined) &&
      !isAuth
    ) {
      navigate("/sign-in");
    }
    dispatch(getCurrentUserDataFromDB());
  }, [dispatch, navigate, isAuth]);
  return (
    <div className="w-full md:flex gap-3">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 flex-col min-h-screen">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default ProtectedLayout;
