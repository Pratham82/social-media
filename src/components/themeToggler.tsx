import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 right-0 z-[10] mt-2 mr-1">
      <button
        type="button"
        className="m-1 rounded-md bg-gray-200 px-2.5 py-2 dark:bg-gray-600"
        onClick={
          theme === "light" ? () => setTheme("dark") : () => setTheme("light")
        }
      >
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeToggler;
