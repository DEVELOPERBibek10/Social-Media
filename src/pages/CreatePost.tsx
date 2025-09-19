import PostForm from "@/components/PostForm";

const CreatePost = () => {
  return (
    <main className="flex flex-1 min-h-screen">
      <div className="flex flex-col flex-1 items-center justify-start gap-10 overflow-auto py-10 px-5 md:px-8 lg:p-14">
        <div className="max-w-[90%] flex justify-start items-center gap-2 w-full">
          <img
            src="https://cdn-icons-png.flaticon.com/128/16025/16025454.png"
            alt="add"
            width={50}
            height={50}
          />
          <h2 className="text-2xl font-bold leading-[140%] tracking-tighter md:text-3xl text-left w-full">
            Create Post
          </h2>
        </div>
        <PostForm action="Create" />
      </div>
    </main>
  );
};

export default CreatePost;
