/**
 * File: src/hooks/themeHook.tsx
 * Purpose: Theme context provider and hook. Exposes `useTheme` and `ThemeProvider`.
 */
import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../constants/colors";
import { ThemeContextType } from "../types/themeType";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightTheme,
  toggleTheme: () => {},
});
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  const colors = theme === "light" ? lightTheme : darkTheme;

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ThemeContextValue = useContext(ThemeContext);
  if (!ThemeContextValue) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ThemeContextValue;
}
