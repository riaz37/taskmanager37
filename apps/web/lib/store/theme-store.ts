"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useTheme } from "next-themes";
import { createSemanticThemeTransition } from "@/lib/hooks/useThemeTransition";

type ThemeMode = "light" | "dark" | "system";

interface EnhancedThemeState {
  mounted: boolean;
  isTransitioning: boolean;

  // Actions
  toggleThemeWithTransition: (event?: React.MouseEvent) => Promise<void>;
  setMounted: (mounted: boolean) => void;
  setTransitioning: (transitioning: boolean) => void;
}

export const useEnhancedThemeStore = create<EnhancedThemeState>()(
  (set, get) => ({
    mounted: false,
    isTransitioning: false,

    toggleThemeWithTransition: async (event?: React.MouseEvent) => {
      if (get().isTransitioning) return;

      set({ isTransitioning: true });

      try {
        // Access next-themes functionality through a callback
        const { theme, setTheme, resolvedTheme } = useTheme();
        const currentTheme = resolvedTheme || theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        if (event && typeof document !== "undefined") {
          const isCurrentlyDark = currentTheme === "dark";

          await createSemanticThemeTransition(
            event,
            () => setTheme(newTheme),
            isCurrentlyDark,
            1200,
          );
        } else {
          setTheme(newTheme);
        }
      } catch (error) {
        console.warn(
          "Theme transition failed, falling back to direct theme change:",
          error,
        );
      } finally {
        set({ isTransitioning: false });
      }
    },

    setMounted: (mounted: boolean) => set({ mounted }),
    setTransitioning: (transitioning: boolean) =>
      set({ isTransitioning: transitioning }),
  }),
);

// Hook to combine next-themes with enhanced transitions
export function useEnhancedTheme() {
  const nextTheme = useTheme();
  const enhancedTheme = useEnhancedThemeStore();

  return {
    ...nextTheme,
    ...enhancedTheme,
    // Override the setTheme to use transitions when called with an event
    setThemeWithTransition: (theme: string, event?: React.MouseEvent) => {
      if (event && typeof document !== "undefined") {
        const isCurrentlyDark = nextTheme.resolvedTheme === "dark";

        createSemanticThemeTransition(
          event,
          () => nextTheme.setTheme(theme),
          isCurrentlyDark,
          1200,
        );
      } else {
        nextTheme.setTheme(theme);
      }
    },
  };
}

// Simplified hook that works better with next-themes
export function useThemeTransitions() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isTransitioning, setTransitioning } = useEnhancedThemeStore();

  const toggleWithTransition = async (event?: React.MouseEvent) => {
    if (isTransitioning) return;

    setTransitioning(true);

    try {
      const currentTheme = resolvedTheme || theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      if (event && typeof document !== "undefined") {
        const isCurrentlyDark = currentTheme === "dark";

        await createSemanticThemeTransition(
          event,
          () => setTheme(newTheme),
          isCurrentlyDark,
          1200,
        );
      } else {
        setTheme(newTheme);
      }
    } catch (error) {
      console.warn("Theme transition failed:", error);
      // Fallback to direct theme change
      const currentTheme = resolvedTheme || theme;
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    } finally {
      setTransitioning(false);
    }
  };

  const setThemeWithTransition = async (
    newTheme: string,
    event?: React.MouseEvent,
  ) => {
    if (isTransitioning) return;

    setTransitioning(true);

    try {
      if (event && typeof document !== "undefined") {
        const currentTheme = resolvedTheme || theme;
        const isCurrentlyDark = currentTheme === "dark";

        await createSemanticThemeTransition(
          event,
          () => setTheme(newTheme),
          isCurrentlyDark,
          1200,
        );
      } else {
        setTheme(newTheme);
      }
    } catch (error) {
      console.warn("Theme transition failed:", error);
      setTheme(newTheme);
    } finally {
      setTransitioning(false);
    }
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    isTransitioning,
    toggleWithTransition,
    setThemeWithTransition,
  };
}

// Selector hooks for better performance
export const useThemeTransitionState = () =>
  useEnhancedThemeStore((state) => ({
    mounted: state.mounted,
    isTransitioning: state.isTransitioning,
  }));

// Hook for theme information with resolved theme
export function useThemeInfo() {
  const { theme, resolvedTheme } = useTheme();

  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    isSystem: theme === "system",
  };
}
