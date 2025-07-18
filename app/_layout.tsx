import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UnistylesRegistry, UnistylesRuntime } from "react-native-unistyles";
import { darkTheme, lightTheme } from "@/themes";
import BackButton from "@/components/BackButton";
import Toastable from "react-native-toastable";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
}).addConfig({
  adaptiveThemes: true,
  initialTheme: UnistylesRuntime.colorScheme === "dark" ? "dark" : "light",
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(drawer)"
          options={{
            header: () => null, // Explicitly set header to null to remove it
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="report"
          options={{
            title: "Make a Report",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen name="spot" options={{ headerShown: false }} />
      </Stack>
      <Toastable duration={3000} />
    </ThemeProvider>
  );
}
