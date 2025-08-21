"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

const defaultProps: Partial<ThemeProviderProps> = {
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: false,
  storageKey: "taskflow-theme",
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const mergedProps = { ...defaultProps, ...props }
  
  return <NextThemesProvider {...mergedProps}>{children}</NextThemesProvider>
} 