import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "./ui/textarea";
import FileUploader from "./shared/FileUploader";
import type { Models } from "appwrite";
import { PostFormSchema } from "@/lib/Zod";
import { useCreatePost } from "@/lib/react-query/queries";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Redux/store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PostFormProps {
  post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    const newPost = await createPost({
      ...values,
      userId: user!.$id,
    });
    if (!newPost) {
      toast("Please try again");
    }
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-[90%]"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photo</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imgUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
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
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags (sparated by comma ",")</FormLabel>
              <FormControl>
                <Input
                  className="h-12 border border-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Movies, Travel, Explore"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            disabled={isLoadingCreate}
            className="h-12 px-5 bg-green-500 hover:bg-green-600 cursor-pointer"
          >
            Create
          </Button>
          <Button
            type="button"
            disabled={isLoadingCreate}
            className="h-12 px-5 bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
