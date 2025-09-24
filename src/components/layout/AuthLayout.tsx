import type { RootState } from "@/lib/Redux/store";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
        <img
          src="https://images.pexels.com/photos/2253573/pexels-photo-2253573.jpeg"
          className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
          alt=""
        />
      </>
    );
  }
};

export default AuthLayout;
