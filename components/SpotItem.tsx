import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router } from "expo-router";
import { Database } from "@/database.types";
import { Spot } from "./types";

interface SpotItemProps {
  spotInfo: Spot;
}

const SpotItem: React.FC<SpotItemProps> = ({ spotInfo }) => {
  const { styles } = useStyles(stylesheet);

  const isFavorite = false;

  const reportInfo = {
    confirmations: 5,
    timeAgo: "1 hour ago",
    reportedBy: "John Doe",
    rank: "Beginner",
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/spot/${spotInfo.id}`);
        }}
        style={styles.container}
      >
        <View style={styles.leftColumn}>
          <Text style={styles.visibilityRange}>{}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.column}>
          <Text style={styles.spotName}>{spotInfo.location}</Text>
          <Text style={styles.statusText}>Current {reportInfo.timeAgo}</Text>
          <Text style={styles.confirmations}>
            {reportInfo.confirmations} confirmations
          </Text>
          <Text style={styles.reportedBy}>
            Reported by {reportInfo.reportedBy} ({reportInfo.rank})
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.distance}>4 km</Text>
          <TouchableOpacity>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={36}
              color={styles.favoriteIcon.color}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpotItem;

const stylesheet = createStyleSheet((theme) => ({
  mainContainer: {
    padding: 16,
    borderColor: theme.colors.borderInput,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
  },
  leftColumn: {
    alignItems: "center",
  },
  rightColumn: {
    alignItems: "center",
  },
  visibilityRange: {
    color: theme.colors.typography,
    fontSize: 24,
    fontWeight: "600",
  },
  line: {
    borderBottomColor: theme.colors.mutedPrimary,
    borderBottomWidth: 10,
    marginVertical: 8,
    width: 90,
  },
  spotName: {
    color: theme.colors.typography,
    fontSize: 24,
    fontWeight: "600",
  },
  distance: {
    color: theme.colors.mutedTypography,
    fontSize: 20,
  },
  statusText: {
    color: theme.colors.mutedTypography,
    fontSize: 14,
  },
  confirmations: {
    color: theme.colors.typography,
    fontSize: 14,
    marginTop: 4,
  },
  reportedBy: {
    color: theme.colors.mutedTypography,
    fontSize: 12,
    marginTop: 4,
  },
  favoriteIcon: {
    color: "gold",
    marginTop: 8,
  },
}));
