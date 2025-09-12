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
import { signupFormSchema } from "@/lib/Zod";
import Loader from "./shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/Appwrite/api";

const SignupForm = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }
  return (
    <Form {...form}>
      <div className="sm:w-[450px] flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          NEPABOOK
        </h1>
        <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-12 sm:pt-5">
          Create new account
        </h2>
        <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-4 text-center ">
          Welcome to Nepabook, Please provide your details to create an account.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full sm:w-[420px] mt-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              <span>SignUp</span>
            )}
          </Button>
          <p className="text-slate-600 text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
