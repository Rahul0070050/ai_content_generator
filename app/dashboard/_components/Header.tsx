import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm border-b-2 flex-wrap bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-md">
        <Search />
        <input
          className="outline-none bg-background"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
      </div>
      <div>
        <h2 className="bg-primary-background px-5 py-3 rounded-full font-semibold text-white cursor-pointer max-sm:hidden">
          Unlock exclusive benefits for just $9.99/month! 🎉
        </h2>
      </div>
    </div>
  );
}

export default Header;
