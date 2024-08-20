import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useLocalSearchParams } from "expo-router";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import MapView, { Callout, Marker } from "react-native-maps";

// Custom marker component using unistyles
const CustomMarker = ({ color, value }: { color: string; value: number }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.markerContainer}>
      <Text style={[styles.markerValue, { color }]}>{value}M</Text>
      <View style={[styles.markerLine, { backgroundColor: color }]} />
      <View style={[styles.markerCircle, { backgroundColor: color }]} />
    </View>
  );
};

export default function ReportScreen() {
  const { styles } = useStyles(stylesheet);
  const { spotId } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;

  // State for the multi-slider (min and max visibility)
  const [visibilityRange, setVisibilityRange] = useState([2, 25]);
  const [clarity, setClarity] = useState<"hazy" | "clear">("hazy");

  const handleReportSubmit = () => {
    // Handle report submission
    console.log(
      `Reporting spot ${spotId} with visibility range ${visibilityRange[0]}m to ${visibilityRange[1]}m and clarity ${clarity}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ti Point</Text>

      <Text style={styles.sectionTitle}>Visibility</Text>
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={[visibilityRange[0], visibilityRange[1]]}
          sliderLength={screenWidth - 40} // Adjust slider width to full width minus padding
          onValuesChange={(values) => setVisibilityRange(values)}
          min={2}
          max={25}
          step={1}
          selectedStyle={styles.selectedSlider}
          unselectedStyle={styles.unselectedSlider}
          isMarkersSeparated={true}
          customMarkerLeft={(e) => (
            <CustomMarker
              color={styles.leftMarker.color}
              value={e.currentValue}
            />
          )} // Left marker custom component
          customMarkerRight={(e) => (
            <CustomMarker
              color={styles.rightMarker.color}
              value={e.currentValue}
            />
          )} // Right marker custom component
          trackStyle={styles.track} // Add track styling for ticker lines
        />
        <View style={styles.visibilityValues}>
          <Text style={styles.visibilityValue}>Min: {visibilityRange[0]}M</Text>
          <Text style={styles.visibilityValue}>Max: {visibilityRange[1]}M</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Clarity</Text>
      <View style={styles.clarityContainer}>
        <TouchableOpacity
          style={styles.clarityButtonHazy}
          onPress={() => setClarity("hazy")}
        >
          <Text style={styles.clarityButtonText}>HAZY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clarityButtonClear}
          onPress={() => setClarity("clear")}
        >
          <Text style={styles.clarityButtonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={handleReportSubmit}
      >
        <Text style={styles.reportButtonText}>MAKE REPORT</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Map</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: -36.3159,
            longitude: 174.7913,
            latitudeDelta: 0.03, // Adjusted to include more area
            longitudeDelta: 0.03, // Adjusted to include more area
          }}
        >
          <Marker
            coordinate={{ latitude: -36.321782, longitude: 174.793537 }}
            title={"Ti Point"}
            description={"The spot you're reporting on."}
          >
            <Callout>
              <Text>Ti Point</Text>
              <Text>Latitude: -36.321782</Text>
              <Text>Longitude: 174.793537</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.typography,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.typography,
    marginBottom: 10,
  },
  sliderContainer: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  visibilityValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  visibilityValue: {
    fontSize: 16,
    color: theme.colors.typography,
  },
  selectedSlider: {
    backgroundColor: theme.colors.primary,
  },
  unselectedSlider: {
    backgroundColor: theme.colors.secondary,
  },
  track: {
    height: 10, // Thicker lines for the track
    backgroundColor: theme.colors.mutedSecondary,
  },
  clarityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  clarityButtonClear: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "teal",
  },
  clarityButtonHazy: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "green",
  },
  clarityButtonText: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: "bold",
  },
  reportButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  reportButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.borderInput,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.colors.typography,
    borderWidth: 2,
    borderRadius: 100,
  },
  markerValue: {
    position: "absolute",
    top: -25, // Position above the marker
    fontSize: 14,
    fontWeight: "bold",
  },
  markerLine: {
    position: "absolute",
    top: -10,
    height: 15,
    width: 2,
  },
  markerCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
  },
  leftMarker: {
    color: "red",
  },
  rightMarker: {
    color: "green",
  },
}));
