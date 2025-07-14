"use client";

import { useTheme } from "next-themes";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
};

export default ToggleThemeButton;
