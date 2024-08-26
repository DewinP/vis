import React from "react";
import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReportHeaderButton from "@/components/ReportHeaderButton";

export default function SpotLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="[spot]" />
    </Stack>
  );
}
