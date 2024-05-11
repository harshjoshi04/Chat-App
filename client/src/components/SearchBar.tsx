import React from "react";
import Input from "./Input";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="flex  justify-center items-center px-2 py-7 gap-4 ">
      <Input
        className="w-9/12"
        size={16}
        placeholder="Search for conversations & contacts..."
      />
      <IoMdSearch size={30} />
    </div>
  );
};

export default SearchBar;
