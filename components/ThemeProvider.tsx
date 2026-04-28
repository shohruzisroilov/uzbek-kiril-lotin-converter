"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return <>{children}</>;

  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={toggleTheme}
          aria-label="Temani o'zgartirish"
          title={theme === "light" ? "Tungi rejimga o'tish" : "Kun rejimiga o'tish"}
          className="
            w-9 h-9 flex items-center justify-center rounded-xl
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            text-gray-600 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-700
            hover:text-primary-600 dark:hover:text-primary-400
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
      {children}
    </>
  );
}
