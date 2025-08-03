'use client';

import { Viga } from 'next/font/google';
import { IoSearch } from 'react-icons/io5';

import History from './history';
import SearchbarInput from './searchbar-input';
import { useSearchbar } from './useStore';

const viga = Viga({
  subsets: ['latin'],
  weight: ['400'],
});

const Searchbar = () => {
  const { addHistory, searchQuery } = useSearchbar();
  return (
    <div
      className={`${viga.className} dark:from-gray-1100 flex h-[57px] w-[906px] items-center justify-between
        rounded-[15px] border border-gray-700 bg-linear-to-tr from-gray-100 to-gray-300 bg-[length:200%_700%]
        bg-bottom-left transition-all duration-300 ease-linear dark:border-gray-400 dark:via-gray-900 dark:to-gray-800`}
    >
      {/* history and input area */}
      <div className='ml-3 flex flex-1 items-center'>
        <History />
        <div className='ml-1 h-6 w-px bg-gray-500'></div>
        {/* input area */}
        <SearchbarInput />
      </div>

      {/* Search icon */}
      <div className='mr-3 flex items-center'>
        <button className='group'>
          <IoSearch
            onClick={() => {
              addHistory(searchQuery);
            }}
            size={27}
            className='text-gray-900 transition-transform duration-300 ease-in-out group-hover:scale-125
              dark:text-gray-200'
          />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
