'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { MoonIcon, Sun } from 'lucide-react';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(theme === 'light');

  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);

  const handleClick = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <button onClick={handleClick} className='relative flex size-12 items-center justify-center'>
      {/* Sun */}
      <div
        className={`absolute transition-transform duration-500 ease-in-out
          ${isLight ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'} `}
      >
        <Sun className='text-gray-200' size={40} />
      </div>

      {/* Moon */}
      <div
        className={`absolute transition-transform duration-500 ease-in-out
          ${isLight ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'} `}
      >
        <MoonIcon className='text-gray-800' size={40} />
      </div>
    </button>
  );
};

export default ToggleThemeButton;
