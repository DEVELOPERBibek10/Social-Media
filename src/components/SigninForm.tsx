import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinFormSchema } from "@/lib/Zod";
import Loader from "./shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignInUser } from "@/lib/react-query/queries";
import { useAppDispatch } from "@/Hook/hook";
import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";
import { setIsAuth } from "@/features/AuthSlice";

const SignupForm = () => {
  const { mutateAsync: signInUser, isPending: isSigningInUser } =
    useSignInUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    const session = await signInUser({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      toast.error("Error signing in user");
      return;
    }
    try {
      dispatch(getCurrentUserDataFromDB()).unwrap();
      dispatch(setIsAuth(true));
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(`Failed to fetch user data: ${error}`);
    }
    form.reset();
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-0">
      <Form {...form}>
        <div className="sm:w-[450px] flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold text-blue-600 text-center">
            NEPABOOK
          </h1>
          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-12 sm:pt-5">
            Login into your account
          </h2>
          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-4 text-center ">
            Welcome to Nepabook, Please provide your details to login.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full sm:w-[420px] mt-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="p-5 cursor-pointer bg-blue-500 hover:bg-blue-600"
              type="submit"
              disabled={isSigningInUser}
            >
              {isSigningInUser ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader w={24} h={24} /> Loading...
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
            <p className="text-slate-600 text-center mt-2">
              Don't have an account?
              <Link
                to="/sign-up"
                className="text-blue-600 hover:underline ml-1"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
