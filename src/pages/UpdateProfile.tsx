import Loader from "@/components/shared/Loader";
import ProfileUploader from "@/components/shared/ProfileUploader";
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
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/Hook/hook";

import { useGetUserById, useUpdateUser } from "@/lib/react-query/queries";
import { getCurrentUserDataFromDB } from "@/lib/Redux/auth";

import type { RootState } from "@/lib/Redux/store";
import { ProfileFormSchema } from "@/lib/Zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const UpdateProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { userId } = useParams();
  const { data: currentUser } = useGetUserById(userId || "");
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      file: [],
      name: user?.name,
      username: user?.username,
      email: user?.email,
      bio: user?.bio || "",
    },
  });

  if ((!user && !currentUser) || !user?.$id) {
    return (
      <div className="min-h-[75vh] w-full flex items-center justify-center">
        <Loader w={46} h={46} />
      </div>
    );
  }

  async function handleUpdate(values: z.infer<typeof ProfileFormSchema>) {
    const updatedUser = await updateUser({
      userId: currentUser!.$id,
      name: values.name,
      bio: values.bio,
      imageId: currentUser!.imageId,
      imageUrl: currentUser!.imageUrl,
      file: values.file,
    });

    if (!updatedUser) {
      toast.error("Failed to update user profile");
      return;
    }
    await dispatch(getCurrentUserDataFromDB());

    return navigate(`/profile/${userId}`);
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1  gap-10 py-10 px-5 md:px-8 lg:p-14 overflow-auto ">
        <div className="max-w-[90%] flex justify-center items-center gap-2 w-full lg:pl-28">
          <img
            src="https://cdn-icons-png.flaticon.com/128/16025/16025454.png"
            alt="add"
            width={50}
            height={50}
          />
          <h2 className="text-2xl font-bold leading-[140%] tracking-tighter md:text-3xl text-left w-full ">
            Edit Profile
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col justify-center gap-9 w-full max-w-[90%] lg:pl-28"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser?.imageUrl}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 border border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                      className="h-12 border border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      disabled
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 border border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      type="email"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-36 border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
              <Button
                type="submit"
                className="h-12 px-5 bg-green-500 hover:bg-green-600 cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating && <Loader w={20} h={20} />}
                Update Profile
              </Button>
              <Button
                type="button"
                className="h-12 px-5 bg-red-500 hover:bg-red-600 cursor-pointer"
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
