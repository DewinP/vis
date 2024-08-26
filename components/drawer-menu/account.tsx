import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerMenuAuth() {
  const { styles } = useStyles(stylesheet);
  const currentRank = "Novice"; // This should be dynamically set based on the user's data
  const points = 16; // This should be dynamically set based on the user's data
  const reportsMade = 25; // This should be dynamically set based on the user's data
  const confirmationsReceived = 10; // This should be dynamically set based on the user's data
  const favoriteSpots = 5; // This should be dynamically set based on the user's data

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={styles.icon.color}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>YourUsername</Text>
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>{currentRank}</Text>
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.boldText}>123456</Text>
            </Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>VIS POINTS:</Text>
          <Text style={styles.pointsValue}>{points}</Text>
        </View>

        <View style={styles.reportStatsContainer}>
          <Text style={styles.reportStat}>
            Reports Made: <Text style={styles.boldText}>{reportsMade}</Text>
          </Text>
          <Text style={styles.reportStat}>
            Confirmations Received:
            <Text style={styles.boldText}>{confirmationsReceived}</Text>
          </Text>
          <Text style={styles.reportStat}>
            Favorite Spots: <Text style={styles.boldText}>{favoriteSpots}</Text>
          </Text>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.platinumButton}>
            <Text style={styles.platinumButtonText}>Remove Ads?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Ranks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    color: theme.colors.typography,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileText: {
    fontSize: 16,
    color: theme.colors.typography,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  pointsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.typography,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.accent,
    marginLeft: 10,
  },
  reportStatsContainer: {
    marginBottom: 20,
  },
  reportStat: {
    fontSize: 16,
    color: theme.colors.typography,
    marginBottom: 5,
    textAlign: "center",
  },
  linksContainer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderInput,
    paddingTop: 15,
    paddingBottom: 30,
  },
  linkButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderInput,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  platinumButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  platinumButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
}));
