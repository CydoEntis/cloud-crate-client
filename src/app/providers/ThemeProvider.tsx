import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "app-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window === "undefined") return defaultTheme;
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    } catch (error) {
      console.warn("Failed to access localStorage for theme:", error);
      return defaultTheme;
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    let actualTheme: "dark" | "light";

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      actualTheme = systemTheme;
    } else {
      actualTheme = theme;
    }

    root.classList.add(actualTheme);
    setResolvedTheme(actualTheme);


  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      const newTheme = mediaQuery.matches ? "dark" : "light";

      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);

    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
        setTheme(newTheme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
