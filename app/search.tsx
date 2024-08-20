import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useRouter } from "expo-router";

const spots = [
  { id: "1", name: "Ti Point" },
  { id: "2", name: "Waba Daba" },
  { id: "3", name: "The Ocean" },
  // Add more spots here
];

export default function SearchScreen() {
  const { styles } = useStyles(stylesheet);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredSpots = spots.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpotSelect = (spotId: string) => {
    // Navigate to the report screen, passing the spotId as a parameter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a Spot</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter spot name"
        placeholderTextColor={styles.placeholder.color}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.spotItem}
            onPress={() => handleSpotSelect(item.id)}
          >
            <Text style={styles.spotName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No spots found</Text>
        }
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.typography,
    marginBottom: 20,
  },
  searchInput: {
    borderColor: theme.colors.borderInput,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    color: theme.colors.typography,
  },
  spotItem: {
    padding: 15,
    borderBottomColor: theme.colors.mutedPrimary,
    borderBottomWidth: 1,
  },
  spotName: {
    fontSize: 18,
    color: theme.colors.typography,
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.mutedTypography,
    fontSize: 16,
    marginTop: 20,
  },
  placeholder: {
    color: theme.colors.mutedTypography,
  },
}));
