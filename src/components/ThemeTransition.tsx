import { useEffect, useState } from "react";

type ThemeTransitionProps = {
  color: string;
  onThemeSwitch: () => void;
  onComplete: () => void;
};

function ThemeTransition({ color, onThemeSwitch, onComplete }: ThemeTransitionProps) {
  const [widthExpanded, setWidthExpanded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setWidthExpanded(true));
  }, []);

  useEffect(() => {
    if (!widthExpanded) return;

    const themeSwitchTimeout = setTimeout(() => {
      onThemeSwitch();
    }, 300);

    const fadeOutTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 350);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 600);

    return () => {
      clearTimeout(themeSwitchTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(completeTimeout);
    };
  }, [widthExpanded, onThemeSwitch, onComplete]);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-screen"
      style={{
        backgroundColor: color,
        width: widthExpanded ? "100vw" : "0",
        opacity: fadeOut ? 0 : 1,
        transition: "width 0.3s ease-in-out, opacity 0.25s ease-in-out",
      }}
    />
  );
}

export default ThemeTransition;
