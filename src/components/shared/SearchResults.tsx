import GridPostList from "./GridPostList";
import Loader from "./Loader";

interface SearchReasultsProps {
  searchedPosts: any;
  isFetchingSearchResults: boolean;
}

const SearchResults = ({
  searchedPosts,
  isFetchingSearchResults,
}: SearchReasultsProps) => {
  if (isFetchingSearchResults) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <Loader w={54} h={54} />
      </div>
    );
  } else if (searchedPosts && searchedPosts.documents.length) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return (
    <p className="text-slate-700 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;
