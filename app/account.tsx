import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

export default function AccountScreen() {
  const { styles } = useStyles(stylesheet);
  const currentRank = "Novice"; // This should be dynamically set based on the user's data
  const points = 16; // This should be dynamically set based on the user's data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Make Reports & Confirm Reports to collect{" "}
          <Text style={styles.boldText}>points</Text>! Become a{" "}
          <Text style={styles.accentText}>Master Vis Reporter</Text>!
        </Text>

        <View style={styles.profileContainer}>
          <Ionicons
            name="person-circle-outline"
            size={100}
            color={styles.icon.color}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>
              Username: <Text style={styles.boldText}>YourUsername</Text>
            </Text>
            <Text style={styles.profileText}>
              Account Level: <Text style={styles.boldText}>{currentRank}</Text>
            </Text>
            <Text style={styles.profileText}>
              User ID: <Text style={styles.boldText}>123456</Text>
            </Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>VIS POINTS:</Text>
          <Text style={styles.pointsValue}>{points}</Text>
        </View>

        <TouchableOpacity style={styles.platinumButton}>
          <Text style={styles.platinumButtonText}>Remove Ads?</Text>
        </TouchableOpacity>

        <Text style={styles.subheader}>Your Rank: {currentRank}</Text>
        <View style={styles.levelsContainer}>
          {[
            "Novice",
            "Beginner",
            "Intermediate",
            "Advanced",
            "PRO",
            "Master",
          ].map((level, index) => (
            <View
              key={index}
              style={[
                styles.levelButton,
                currentRank === level && styles.currentRankButton,
              ]}
            >
              <Ionicons
                name={currentRank === level ? "star" : "star-outline"}
                size={40}
                color={
                  currentRank === level
                    ? styles.currentRankIcon.color
                    : styles.icon.color
                }
              />
              <Text
                style={[
                  styles.levelLabel,
                  currentRank === level && styles.currentRankLabel,
                ]}
              >
                {level}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.leaderboardLink}>
          <Text style={styles.leaderboardText}>View Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    color: theme.colors.typography,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 1,
    color: theme.colors.typography,
    textAlign: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  accentText: {
    color: theme.colors.accent,
    fontWeight: "bold",
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
  subheader: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.typography,
    marginBottom: 10,
    textAlign: "center",
  },
  levelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  levelButton: {
    width: "30%",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.borderInput,
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 14,
    color: theme.colors.typography,
    textAlign: "center",
    marginTop: 5,
  },
  currentRankButton: {
    borderColor: theme.colors.accent,
  },
  currentRankLabel: {
    color: theme.colors.accent,
    fontWeight: "bold",
  },
  currentRankIcon: {
    color: theme.colors.accent,
  },
  leaderboardLink: {
    marginTop: 20,
  },
  leaderboardText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
}));
