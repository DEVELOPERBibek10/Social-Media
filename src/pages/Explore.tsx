import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/Hook/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 700);
  const { data: searchedPost, isFetching: isSearching } =
    useSearchPosts(debouncedSearch);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, searchValue]);

  if (!posts)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader w={54} h={54} />
      </div>
    );

  const showSearchReasults = searchValue !== "";

  const showPosts =
    !showSearchReasults &&
    posts.pages.every((item) => {
      return item.documents.length === 0;
    });

  return (
    <div className="flex flex-col flex-1 items-center overflow-y-auto overflow-x-hidden py-10 px-5 md:p-14">
      <div className="mx-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-2xl font-bold leading-[140%] tracking-tighter md:text-3xl w-full">
          Search Post
        </h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-gray-100 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8915/8915520.png"
            alt="search"
            className="w-8 h-8"
          />
          <Input
            type="text"
            placeholder="Search"
            className="h-12 border border-none outline-none bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-16 mb-7">
        <h3 className="text-lg font-bold leading-[140%] tracking-tighter md:text-2xl w-full">
          Popular Today
        </h3>
        <div className="flex justify-center items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-sm font-medium leading-[140%] md:text-base text-slate-700">
            All
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/128/10833/10833623.png"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full">
        {showSearchReasults ? (
          <SearchResults
            searchedPosts={searchedPost}
            isFetchingSearchResults={isSearching}
          />
        ) : showPosts ? (
          <p>End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10 w-full mx-auto">
          <Loader w={26} h={26} />
        </div>
      )}
    </div>
  );
};

export default Explore;
