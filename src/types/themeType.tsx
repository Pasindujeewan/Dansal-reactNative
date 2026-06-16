/**
 * File: src/types/themeType.tsx
 * Purpose: Theme context type definition.
 */
import { ThemeColors } from "./colurType";
export type ThemeContextType = {
  theme: string;
  colors: ThemeColors;
  toggleTheme: () => void;
};
