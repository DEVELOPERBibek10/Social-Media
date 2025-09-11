import AuthLayout from "@/components/layout/AuthLayout";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Home from "@/pages/Home";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const route = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<AuthLayout/>}>
            <Route path="/sign-up" element={<SignupPage/>} />
            <Route path="/sign-in" element={<SigninPage/>} />
        </Route>,
        <Route element={<ProtectedLayout/>}>
            <Route index element={<Home/>}/>
        </Route>
    ])
)