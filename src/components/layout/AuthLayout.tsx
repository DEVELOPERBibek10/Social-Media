import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = false;

  if(isAuth){
    return <Navigate to={"/"}/>
  }else{
    return (
      <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet/>
      </section>
      <img src="https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_640.jpg"
      className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
      alt="" />
      </>

    )
  }
};

export default AuthLayout;
