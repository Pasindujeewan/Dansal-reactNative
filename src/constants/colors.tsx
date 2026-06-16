/**
 * File: src/constants/colors.tsx
 * Purpose: Defines `lightTheme` and `darkTheme` color palettes used by the app.
 * Exports: `lightTheme`, `darkTheme`.
 */
import { ThemeColors } from "../types/colurType";

export const lightTheme: ThemeColors = {
  background: "#f8fafc",
  card: "#ffffff",

  primary: "#f97316",
  secondary: "#fb923c",

  text: "#0f172a",
  subText: "#475569",

  border: "#e2e8f0",

  headerBackground: "#f97316",
  headerText: "#ffffff",

  inputBackground: "#ffffff",
  placeholderText: "#94a3b8",

  icon: "#0f172a",

  tabActive: "#f97316",
  tabInactive: "#64748b",

  buttonText: "#ffffff",

  success: "#16a34a",
  error: "#dc2626",
  warning: "#eab308",

  mapBackground: "#dbeafe",

  overlay: "#00000040",

  shadow: "#00000020",
};
export const darkTheme: ThemeColors = {
  background: "#0f172a",
  card: "#1e293b",

  primary: "#f97316",
  secondary: "#fb923c",

  text: "#ffffff",
  subText: "#cbd5e1",

  border: "#334155",

  headerBackground: "#1e293b",
  headerText: "#ffffff",

  inputBackground: "#334155",
  placeholderText: "#94a3b8",

  icon: "#ffffff",

  tabActive: "#f97316",
  tabInactive: "#94a3b8",

  buttonText: "#ffffff",

  success: "#22c55e",
  error: "#ef4444",
  warning: "#facc15",

  mapBackground: "#172554",

  overlay: "#00000070",

  shadow: "#00000060",
};
