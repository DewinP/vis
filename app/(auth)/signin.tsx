import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Alert } from "react-native";
import { supabase } from "@/utils/supabase"; // Adjust based on your project structure

import { useRouter, useLocalSearchParams } from "expo-router"; // Import the router hooks

export default function SignInScreen() {
  const { styles } = useStyles(stylesheet);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize the router hook

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Email not confirmed") {
          Alert.alert(
            "Email Not Confirmed",
            "Please confirm your email using the link we sent to your inbox before logging in."
          );
        } else {
          throw error; // Let the catch block handle other errors
        }
        return;
      }

      const { user } = data;

      if (!user.email_confirmed_at) {
        Alert.alert(
          "Email Not Confirmed",
          "Please confirm your email using the link we sent to your inbox before logging in."
        );
      } else {
        // Navigate to the landing page
        router.push("/(drawer)/(tabs)"); // Adjust this route based on your app's structure
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contributeContainer}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.contributeText}>
            Welcome back to Vis Report! Continue contributing to the community
            by signing in. Your reports help make diving safer and more
            enjoyable for everyone.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={styles.placeholder.color}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={styles.placeholder.color}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.navigate("/(auth)/signup")}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contributeContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  contributeText: {
    color: theme.colors.mutedTypography,
    fontSize: 14,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.typography,
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.borderInput,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    width: "100%",
  },
  inputIcon: {
    color: theme.colors.mutedTypography,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: theme.colors.typography,
    fontSize: 16,
  },
  placeholder: {
    color: theme.colors.mutedTypography,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 20,
  },
  signInButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.mutedTypography,
    fontSize: 14,
  },
  signUpLink: {
    color: theme.colors.primary,
    fontSize: 14,
    marginLeft: 5,
  },
}));
