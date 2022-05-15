import dynamic from "next/dynamic";

const SearchPage = dynamic(() => import("../../src/modules/search"));

function Search() {
  return <SearchPage />;
}

export default Search;
