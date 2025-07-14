"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="relative h-[32px] w-[67px] bg-beige-ergo-navbar dark:bg-dark-green-ergo-navbar rounded-2xl p-1  flex items-center dark:flex-row-reverse duration-600 ease-in-out"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {/* the white soft shadow */}
      <div
        className="absolute top-0 left-0 dark:left-auto dark:right-1 w-2/3 dark:w-4/5 h-1/2 
              bg-white/30 dark:bg-white/20 blur-md"
      ></div>

      {/* the circle around the icon */}
      <div className="flex items-center justify-center size-6 rounded-full bg-green-ergo-navbar dark:bg-yellow-ergo-navbar">
        {/* the icon */}
        {theme === "light" ? (
          <SunMediumIcon className="text-beige-ergo-navbar" size={13} />
        ) : (
          <MoonIcon className="text-black stroke-3" size={13} />
        )}
      </div>
    </button>
  );
};

export default ToggleThemeButton;
