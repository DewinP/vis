import React, { useState } from "react";
import SpotItem from "@/components/SpotItem";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const spotData = [
  {
    spotName: "Ti Point",
    visibilityRange: "10-12m",
    confirmations: 10,
    timeAgo: "1 hour",
    distance: 5,
    isFavorite: false,
  },
  {
    spotName: "Waba Daba",
    visibilityRange: "2-4m",
    confirmations: 10,
    timeAgo: "1 hour",
    distance: 5,
    isFavorite: false,
  },
  {
    spotName: "The ocean",
    visibilityRange: "6-8m",
    confirmations: 10,
    timeAgo: "1 hour",
    distance: 5,
    isFavorite: false,
  },
];

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const [expandedSpot, setExpandedSpot] = useState<string | null>(null);

  const toggleExpand = (spotName: string) => {
    setExpandedSpot(expandedSpot === spotName ? null : spotName);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {spotData.map((spot) => (
          <SpotItem
            key={spot.spotName}
            spotName={spot.spotName}
            visibilityRange={spot.visibilityRange}
            confirmations={spot.confirmations}
            timeAgo={spot.timeAgo}
            distance={spot.distance}
            isFavorite={spot.isFavorite}
            onFavoriteToggle={() => {}}
            isExpanded={expandedSpot === spot.spotName}
            onExpandToggle={() => toggleExpand(spot.spotName)}
            reportedBy="John Doe"
            rank="Vis Master"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: 16,
    flex: 1,
  },
}));
