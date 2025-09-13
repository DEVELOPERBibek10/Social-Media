import { setIsAuth } from "@/features/AuthSlice";
import { useAppDispatch } from "@/Hook/hook";
import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";
import type { RootState } from "@/lib/Redux/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    const cookieFallback = JSON.parse(localStorage.getItem("cookieFallback")!);
    if (
      (cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined) &&
      !isAuth
    ) {
      navigate("/sign-in");
    }
    dispatch(getCurrentUserDataFromDB());
    setIsAuth(true);
  }, [dispatch, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
