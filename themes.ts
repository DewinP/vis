import { tailwindColors } from "@/constants/tailwind-colors";

// Replace any primary color name from tailwind-color
const themePrimaryColor = "violet";
const themeSecondaryColor = "gray";
const themeErrorColor = "red";

export const lightTheme = {
  colors: {
    white: "white",
    black: "black",
    typography: "#000000",
    mutedTypography: "#6B7280", // Lighter version of the typography color
    background: "#ffffff",
    primary: tailwindColors[themePrimaryColor][700],
    secondary: tailwindColors[themeSecondaryColor][300],
    accent: tailwindColors[themePrimaryColor][700],
    error: tailwindColors[themeErrorColor][500],
    mutedPrimary: tailwindColors[themePrimaryColor][600],
    mutedSecondary: tailwindColors[themeSecondaryColor][400],
    mutedError: tailwindColors[themeErrorColor][600],
    mutedTransparent: tailwindColors[themeSecondaryColor][100],
    borderInput: tailwindColors[themeSecondaryColor][400], // Neutral color when not focused
    borderInputFocused: tailwindColors[themePrimaryColor][500], // Accent color when focused
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;

export const darkTheme = {
  colors: {
    white: "white",
    black: "black",
    typography: "#ffffff",
    mutedTypography: "#9CA3AF", // Lighter version of the typography color
    background: "#0C0A09",
    primary: tailwindColors[themePrimaryColor][600],
    secondary: tailwindColors[themeSecondaryColor][700],
    accent: tailwindColors[themePrimaryColor][600],
    error: tailwindColors[themeErrorColor][700],
    mutedPrimary: tailwindColors[themePrimaryColor][700],
    mutedSecondary: tailwindColors[themeSecondaryColor][600],
    mutedError: tailwindColors[themeErrorColor][600],
    mutedTransparent: tailwindColors[themeSecondaryColor][900],
    borderInput: tailwindColors[themeSecondaryColor][600], // Neutral color when not focused
    borderInputFocused: tailwindColors[themePrimaryColor][400], // Accent color when focused
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;
