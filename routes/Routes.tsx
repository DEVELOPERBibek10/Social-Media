import AuthLayout from "@/components/layout/AuthLayout";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import CreatePost from "@/pages/CreatePost";
import EditPost from "@/pages/EditPost";
import Explore from "@/pages/Explore";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Peoples from "@/pages/Peoples";
import PostDetail from "@/pages/PostDetail";
import Profile from "@/pages/Profile";
import Saved from "@/pages/Saved";
import SigninPage from "@/pages/SigninPage";
import SignupPage from "@/pages/SignupPage";
import UpdateProfile from "@/pages/UpdateProfile";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const route = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<AuthLayout />}>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/sign-in" element={<SigninPage />} />
    </Route>,
    <Route element={<ProtectedLayout />}>
      <Route index element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/saved-posts" element={<Saved />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/all-users" element={<Peoples />} />
      <Route path="/profile/:userId/*" element={<Profile />} />
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="/update-profile/:userId" element={<UpdateProfile />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
    </Route>,
    <Route path="*" element={<NotFound />} />,
  ])
);
