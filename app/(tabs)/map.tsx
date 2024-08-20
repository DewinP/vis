import React, { useState, useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity, Alert } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";

const newZealandRegion = {
  latitude: -40.9006, // Latitude of New Zealand's center
  longitude: 173.886, // Shifted longitude to move map view to the right
  latitudeDelta: 17.0, // Increased to show the entire country
  longitudeDelta: 17.0, // Increased to show the entire country
};

const divingLocations = [
  { name: "Poor Knights Islands", latitude: -35.4504, longitude: 174.7325 },
  { name: "Goat Island", latitude: -36.2617, longitude: 174.7971 },
  { name: "The Aldermen Islands", latitude: -36.9184, longitude: 176.0887 },
  { name: "White Island", latitude: -37.5208, longitude: 177.1806 },
  { name: "The Canterbury Wreck", latitude: -35.2262, longitude: 174.1312 },
  { name: "The Mikhail Lermontov", latitude: -40.99, longitude: 174.067 },
  { name: "Kapiti Island", latitude: -40.8629, longitude: 174.9268 },
  { name: "The Rena Wreck", latitude: -37.5451, longitude: 176.3948 },
  { name: "Fiordland", latitude: -45.4167, longitude: 167.7167 },
  { name: "Stewart Island", latitude: -46.896, longitude: 167.8253 },
  { name: "Aramoana Mole", latitude: -45.769, longitude: 170.7183 },
  { name: "Rainbow Warrior Wreck", latitude: -34.9303, longitude: 173.8137 },
  {
    name: "Taputeranga Marine Reserve",
    latitude: -41.335,
    longitude: 174.7643,
  },
  { name: "Bay of Islands", latitude: -35.2817, longitude: 174.091 },
  { name: "Mokohinau Islands", latitude: -35.9233, longitude: 175.1244 },
  { name: "Tuhua (Mayor Island)", latitude: -37.2811, longitude: 176.25 },
  {
    name: "The Poor Knights - Blue Mao Mao Arch",
    latitude: -35.45,
    longitude: 174.7333,
  },
  { name: "Wellington Harbour", latitude: -41.2805, longitude: 174.7801 },
  { name: "Marlborough Sounds", latitude: -41.2613, longitude: 174.0252 },
  { name: "The Volkner Rocks", latitude: -37.525, longitude: 177.16 },
];

export default function TabTwoScreen() {
  const { styles } = useStyles(stylesheet);
  const [location, setLocation] = useState<any>(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission to access location was denied",
          "We need location access to show your current location."
        );
        return;
      }
    })();
  }, []);

  const handleLocateMe = async () => {
    try {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <MapView ref={mapRef} initialRegion={newZealandRegion} style={styles.map}>
        {divingLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={`Diving spot: ${location.name}`}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.pinButton} onPress={handleLocateMe}>
        <Ionicons style={styles.pin} size={28} name="location-outline" />
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  screenContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  pinButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.accent,
    borderRadius: 50,
    padding: 10,
  },
  pin: {
    color: theme.colors.background,
  },
}));
