import { Search as SearchIcon } from "lucide-react";

function Search() {
  return (
    <div className="flex flex-col justify-center items-center p-10 bg-gradient-to-br from-search-background-start via-search-background-mid to-search-background-end text-white">
      <h2 className="text-lg font-bold">Browse All Templates</h2>
      <p>What would you create today</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-lg bg-white my-5 w-[30%]">
          <SearchIcon className="text-primary" />
          <input
            className="bg-transparent outline-none w-full text-black"
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
