import { UnistylesRegistry } from "react-native-unistyles";
import { darkTheme, lightTheme } from "./themes";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
