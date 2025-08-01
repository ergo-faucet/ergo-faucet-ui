import { IoSearch } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';

import SearchbarInput from './searchbar-input';

const Searchbar = () => {
  return (
    <div
      className={`dark:bg-green-ergo-navbar flex h-[56px] w-[672px] items-center justify-between rounded-3xl bg-white
        p-3 shadow-md transition-all duration-300 ease-linear dark:shadow-black`}
    >
      {/* Search input area */}
      <div className='flex flex-1 items-center'>
        <button className='group'>
          <IoSearch
            size={27}
            className='text-gray-text-ergo-navbar dark:text-yellow-ergo-navbar transition-transform duration-300
              ease-in-out group-hover:scale-125'
          />
        </button>

        <SearchbarInput />
      </div>

      {/* Settings section */}
      <div className='flex items-center'>
        <div className='dark:bg-yellow-ergo-navbar mx-3 h-8 w-px bg-neutral-400'></div>
        <button
          className='dark:hover:bg-dark-green-ergo-navbar rounded-full p-1 transition-colors hover:bg-gray-100'
          aria-label='Search settings'
        >
          <VscSettings
            size={28}
            className='text-beige-ergo-navbar dark:text-yellow-ergo-navbar scale-x-[-1] stroke-[0.5px]'
          />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
