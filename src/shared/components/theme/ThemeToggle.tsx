import { Moon, Sun } from "lucide-react";
import { useRef, useState, type JSX } from "react";
import ThemeTransition from "./ThemeTransition";
import { Button } from "../ui/button";
import { useTheme } from "@/app/providers/ThemeProvider";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [transition, setTransition] = useState<JSX.Element | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getTransitionColor = () => {
    const lightBg = "#ffffff";
    const darkBg = "#0F0F1A";
    return resolvedTheme === "dark" ? lightBg : darkBg;
  };

  const toggleTheme = () => {
    console.log(`Current theme: ${theme}, resolved: ${resolvedTheme}`);

    let newTheme: "dark" | "light";

    if (theme === "system") {
      newTheme = resolvedTheme === "dark" ? "light" : "dark";
    } else {
      newTheme = theme === "dark" ? "light" : "dark";
    }

    console.log(`Switching to: ${newTheme}`);

    setTransition(
      <ThemeTransition
        color={getTransitionColor()}
        onThemeSwitch={() => {
          console.log(`Theme transition executing switch to: ${newTheme}`);
          setTheme(newTheme);
        }}
        onComplete={() => {
          console.log("Theme transition complete");
          setTransition(null);
        }}
      />
    );
  };

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {transition}
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="text-foreground"
      >
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
