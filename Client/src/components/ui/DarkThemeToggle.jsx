import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const DarkThemeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-full bg-[var(--bg)]  text-black dark:text-white transition"
      >
        {dark ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-blue-500" size={20} />
        )}
      </button>
    </div>
  );
};

export default DarkThemeToggle;
