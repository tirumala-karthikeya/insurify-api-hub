
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
