import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface SpotItemProps {
  spotName: string;
  visibilityRange: string;
  confirmations: number;
  timeAgo: string;
  distance: number; // Assuming distance is in kilometers
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  reportedBy: string; // New prop for reported by
  rank: string; // New prop for rank
}

const SpotItem: React.FC<SpotItemProps> = ({
  spotName,
  visibilityRange,
  confirmations,
  timeAgo,
  distance,
  isFavorite,
  onFavoriteToggle,
  isExpanded,
  onExpandToggle,
  reportedBy,
  rank,
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onExpandToggle} style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.visibilityRange}>{visibilityRange}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.column}>
          <Text style={styles.spotName}>{spotName}</Text>
          <Text style={styles.statusText}>Current {timeAgo}</Text>
          <Text style={styles.confirmations}>
            {confirmations} confirmations
          </Text>
          <Text style={styles.reportedBy}>
            Reported by {reportedBy} ({rank})
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.distance}>{distance} km</Text>
          <TouchableOpacity onPress={onFavoriteToggle}>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={36}
              color={styles.favoriteIcon.color}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>Make a VIS Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Visibility</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flagButton}>
            <Text style={styles.flagButtonText}>Wrong Visibility</Text>
          </TouchableOpacity>
        </View>
      )}
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
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4, // Added to ensure spacing between buttons
  },
  confirmButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  flagButton: {
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4, // Added to ensure spacing between buttons
  },
  flagButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  reportButton: {
    backgroundColor: "teal",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 4, // Added to ensure spacing between buttons
  },
  reportButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
}));
