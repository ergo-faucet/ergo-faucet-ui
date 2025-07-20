'use client';

import { useTheme } from 'next-themes';

import { MoonIcon, SunMediumIcon } from 'lucide-react';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className='bg-beige-ergo-navbar dark:bg-dark-green-ergo-navbar relative flex h-[32px] w-[67px] items-center
        rounded-2xl p-1 duration-600 ease-in-out dark:flex-row-reverse'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {/* the white soft shadow */}
      <div
        className='absolute top-0 left-0 h-1/2 w-2/3 bg-white/30 blur-md dark:right-1 dark:left-auto dark:w-4/5
          dark:bg-white/20'
      ></div>

      {/* the circle around the icon */}
      <div
        className='bg-green-ergo-navbar dark:bg-yellow-ergo-navbar flex size-6 items-center justify-center rounded-full'
      >
        {/* the icon */}
        {theme === 'light' ? (
          <SunMediumIcon className='text-beige-ergo-navbar' size={13} />
        ) : (
          <MoonIcon className='stroke-3 text-black' size={13} />
        )}
      </div>
    </button>
  );
};

export default ToggleThemeButton;
