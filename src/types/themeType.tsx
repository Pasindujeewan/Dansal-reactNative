import { ThemeColors } from "./colurType";
export type ThemeContextType = {
  theme: string;
  colors: ThemeColors;
  toggleTheme: () => void;
};
