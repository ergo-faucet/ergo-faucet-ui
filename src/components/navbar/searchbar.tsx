"use client";

import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`
      flex items-center justify-between w-[672px] h-[56px] p-3 
      bg-white dark:bg-green-ergo-navbar rounded-3xl 
      transition-all duration-300 ease-linear dark:shadow-black shadow-md
      ${isFocused ? "ring-2 ring-blue-400 dark:ring-yellow-ergo-navbar" : "shadow-gray-500/50"}
    `}
    >
      {/* Search input area */}
      <div className="flex items-center flex-1">
        <button className="group">
          <IoSearch
            size={27}
            className="
      text-gray-text-ergo-navbar dark:text-yellow-ergo-navbar
      transition-transform duration-300 ease-in-out 
      group-hover:scale-125
    "
          />
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            font-medium tracking-widest text-xl ml-3 w-full
             focus:outline-none
            placeholder-gray-text-ergo-navbar dark:placeholder-neutral-300
            text-gray-800 dark:text-white
          "
        />
      </div>

      {/* Settings section */}
      <div className="flex items-center">
        <div className="h-8 w-px mx-3 bg-neutral-400 dark:bg-yellow-ergo-navbar"></div>
        <button
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-green-ergo-navbar transition-colors"
          aria-label="Search settings"
        >
          <VscSettings
            size={28}
            className="scale-x-[-1] stroke-[0.5px] text-gray-text-ergo-navbar dark:text-yellow-ergo-navbar"
          />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
