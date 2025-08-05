import { Moon, Sun } from "lucide-react";
import { useRef, useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import ThemeTransition from "./ThemeTransition";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [transition, setTransition] = useState<JSX.Element | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getTransitionColor = () => {
    const lightBg = "#ffffff";
    const darkBg = "#0F0F1A";
    return theme === "dark" ? lightBg : darkBg;
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTransition(
      <ThemeTransition
        color={getTransitionColor()}
        onThemeSwitch={() => setTheme(newTheme)}
        onComplete={() => setTransition(null)}
      />
    );
  };

  const isDark = theme === "dark";

  return (
    <>
      {transition}
      <Button ref={buttonRef} variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
        {isDark ? (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
      </Button>
    </>
  );
}

export default ThemeToggle;
