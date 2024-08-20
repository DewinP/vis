import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useRef, useState } from "react";
import { router, usePathname } from "expo-router";

const CustomHeader = () => {
  const { styles } = useStyles(stylesheet);
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const path = usePathname();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        {path === "/map" ? (
          <Text style={styles.title}>Vis Report Map</Text>
        ) : (
          <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} style={styles.inputIconLeft} />
            <TextInput
              ref={textInputRef}
              style={[
                styles.textInput,
                isFocused && styles.textInputFocused, // Apply focused style conditionally
              ]}
              value={searchQuery}
              placeholder="Search"
              onFocus={() => {
                setIsFocused(true);
                console.log("onFocus");
              }}
              onBlur={() => setIsFocused(false)} // Remove focus style on blur
              onChangeText={onChangeSearch}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.profileButtonContainer}
          onPress={() => router.navigate("/account")}
        >
          <Ionicons
            style={styles.profileIcon}
            name="person-outline"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const stylesheet = createStyleSheet((theme) => ({
  mainContainer: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // Large shadow offset for noticeable shadow at the bottom
    shadowOpacity: 0.1, // Higher opacity for a more visible shadow
    shadowRadius: 1, // Larger radius for a softer, spread-out shadow
    elevation: 1, // Higher elevation to match shadow effect on Android
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.colors.borderInput, // Default border color
    borderWidth: 1,
    borderRadius: 100,
    flex: 1,
    paddingHorizontal: 10,
  },
  inputIconLeft: {
    color: theme.colors.mutedTypography,
    marginRight: 10,
  },
  textInput: {
    color: theme.colors.typography,
    flex: 1,
    paddingVertical: 10,
  },
  textInputFocused: {
    borderColor: theme.colors.borderInputFocused, // Focused border color
  },
  title: {
    color: theme.colors.typography,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileButtonContainer: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.accent,
    alignSelf: "flex-end",
  },
  profileIcon: {
    color: theme.colors.white,
  },
}));
