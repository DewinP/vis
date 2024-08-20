import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

export default function SignInLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
