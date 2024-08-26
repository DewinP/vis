import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";
import DrawerMenuAuth from "./account";

// Mock authentication hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Toggle auth state for demo purposes
  const toggleAuth = () => setIsAuthenticated((prev) => !prev);

  return { isAuthenticated, toggleAuth };
};

export function DrawerMenu(props: DrawerContentComponentProps) {
  const { isAuthenticated, toggleAuth } = useAuth();
  const { styles } = useStyles(stylesheet);

  const [visible, setVisible] = React.useState(false);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* {!isAuthenticated ? (
        <View style={styles.authContainer}>
          <Text style={styles.catchyPhrase}>
            Authenticate to unlock all features!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("/(auth)/signin")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("/(auth)/signup")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.buttonText}>Toggle Auth (Demo)</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <DrawerMenuAuth />
      )} */}

      <DrawerMenuAuth />
    </DrawerContentScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.margins.lg,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.margins.xl, // Add padding to make buttons appear more centered
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.margins.lg, // Increase button height
    paddingHorizontal: theme.margins.xl, // Increase button width
    borderRadius: theme.margins.md, // Increase border radius for rounded buttons
    marginVertical: theme.margins.md, // Add more space between buttons
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 18, // Increase font size for better readability
    fontWeight: "bold", // Make text bold
  },
  catchyPhrase: {
    color: theme.colors.typography,
    fontSize: 16,
    textAlign: "center",
    marginBottom: theme.margins.lg,
    fontWeight: "600", // Slightly bolder text
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: theme.colors.typography,
    fontSize: 24, // Larger font size for profile greeting
    marginBottom: theme.margins.lg,
    fontWeight: "bold", // Make the profile text bold
  },
}));
