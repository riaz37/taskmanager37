"use client";

import * as React from "react";
import { Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isChanging, setIsChanging] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async (event: React.MouseEvent) => {
    if (isChanging) return;

    setIsChanging(true);

    try {
      // Toggle between light and dark
      const newTheme = resolvedTheme === "dark" ? "light" : "dark";
      const isCurrentlyDark = resolvedTheme === "dark";

      // Use the existing theme transition hook
      if (
        typeof window !== "undefined" &&
        "createSemanticThemeTransition" in window
      ) {
        // If the hook is available globally, use it
        await (window as any).createSemanticThemeTransition(
          event,
          () => setTheme(newTheme),
          isCurrentlyDark,
          1200
        );
      } else {
        // Fallback to direct theme change
        await setTheme(newTheme);
      }
    } finally {
      // Small delay to show the transition
      setTimeout(() => setIsChanging(false), 600);
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full hover:bg-muted/50 transition-all duration-200 hover:scale-105"
      onClick={handleThemeChange}
      disabled={isChanging}
    >
      {isChanging ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isDark ? (
        <Sun className="h-4 w-4 text-foreground" />
      ) : (
        <Moon className="h-4 w-4 text-foreground" />
      )}
    </Button>
  );
}
