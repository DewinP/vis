import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { router, useLocalSearchParams } from "expo-router";
import MapView, { Callout, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import { Database } from "@/database.types"; // Adjust the path as necessary

// Define the type for a spot row
type Spot = Database["public"]["Tables"]["spots"]["Row"];
type Report = {
  visibility_range: string;
  clarity: "hazy" | "clear";
  report_grade: "weak" | "intermediate" | "strong" | "master";
  reported_by_name: string;
  reported_by_rank: string;
  report_time_ago: string;
};

export default function SpotScreen() {
  const { styles } = useStyles(stylesheet);
  const { spot } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;
  const [spotInfo, setSpotInfo] = useState<Spot | null>(null);
  const [lastReport, setLastReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for testing
  const dummySpot: Spot = {
    id: "1",
    region: "Auckland",
    location: "Ti Point",
    latitude: -36.32278801,
    longitude: 174.798673,
    min_possible_vis: 3,
    max_possible_vis: 20,
    last_report_id: "123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    visible: true,
  };

  const dummyReport: Report = {
    visibility_range: "4-6m",
    clarity: "clear",
    report_grade: "strong",
    reported_by_name: "John Doe",
    reported_by_rank: "Vis Master",
    report_time_ago: "2 hours ago",
  };

  useEffect(() => {
    const fetchSpot = async () => {
      // Simulating a fetch with dummy data
      setTimeout(() => {
        setSpotInfo(dummySpot);
        setLastReport(dummyReport);
        setLoading(false);
      }, 1000);

      // Uncomment this for real fetch
      // const { data, error } = await supabase
      //   .from("spots")
      //   .select("*")
      //   .eq("id", spot)
      //   .single();

      // if (error) {
      //   console.error("Error fetching spot:", error);
      // } else {
      //   setSpotInfo(data as Spot);

      //   if (data?.last_report_id) {
      //     const { data: reportData, error: reportError } = await supabase
      //       .from("reports")
      //       .select("visibility_range, clarity, report_grade, reported_by_name, reported_by_rank, report_time_ago")
      //       .eq("id", data.last_report_id)
      //       .single();

      //     if (reportError) {
      //       console.error("Error fetching last report:", reportError);
      //     } else {
      //       setLastReport(reportData as Report);
      //     }
      //   }
      // }
      // setLoading(false);
    };

    if (spot) {
      fetchSpot();
    }
  }, [spot]);

  const renderGradeIcon = (grade: Report["report_grade"]) => {
    switch (grade) {
      case "weak":
        return <Ionicons name="alert-circle-outline" size={18} color="red" />;
      case "intermediate":
        return (
          <Ionicons name="remove-circle-outline" size={18} color="orange" />
        );
      case "strong":
        return (
          <Ionicons name="checkmark-circle-outline" size={18} color="white" />
        );
      case "master":
        return <Ionicons name="ribbon-outline" size={18} color="green" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.loadingIndicator.color} />
      </View>
    );
  }

  if (!spotInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Spot not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{spotInfo.location}</Text>

      {/* Last Report Section */}
      <View style={styles.lastReportContainer}>
        <Text style={styles.latestReportLabel}>Strong Report</Text>
        <View style={styles.visibilityClarityContainer}>
          <View style={styles.metricContainer}>
            <Text style={styles.metricValue}>
              {lastReport?.visibility_range}
            </Text>
            <Text style={styles.metricLabel}>Visibility</Text>
          </View>
          <View style={styles.metricContainer}>
            <Text style={styles.metricValue}>
              {lastReport?.clarity === "clear" ? "Clear" : "Hazy"}
            </Text>
            <Text style={styles.metricLabel}>Clarity</Text>
          </View>
        </View>
        <View style={styles.reportGradeContainer}>
          <Text style={styles.gradeText}>Strong Report </Text>
          {renderGradeIcon(lastReport?.report_grade || "strong")}
        </View>
        <Text style={styles.reportInfoText}>
          Reported by: {lastReport?.reported_by_name} (
          {lastReport?.reported_by_rank})
        </Text>
        <Text style={styles.reportInfoText}>{lastReport?.report_time_ago}</Text>
      </View>

      <Text style={styles.sectionTitle}>Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            console.log(`Confirmed report for spot ${spotInfo.location}`)
          }
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newReportButton}
          onPress={() => router.push("/report")}
        >
          <Text style={styles.newReportButtonText}>New Report</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Map</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: spotInfo.latitude,
            longitude: spotInfo.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{
              latitude: spotInfo.latitude,
              longitude: spotInfo.longitude,
            }}
            title={spotInfo.location}
            description={"The spot you're reporting on."}
          >
            <Callout>
              <Text>{spotInfo.location}</Text>
              <Text>Latitude: {spotInfo.latitude}</Text>
              <Text>Longitude: {spotInfo.longitude}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  loadingIndicator: {
    color: theme.colors.primary,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: "center",
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
  lastReportContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    position: "relative",
  },
  latestReportLabel: {
    position: "absolute",
    top: -12,
    left: 16,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    color: theme.colors.white,
    fontSize: 14,
    padding: 5,
    fontWeight: "bold",
  },
  visibilityClarityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricContainer: {
    flex: 1,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  metricLabel: {
    fontSize: 16,
    color: theme.colors.typography,
  },
  reportGradeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
    marginBottom: 10,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.white,
    marginRight: 5,
  },
  reportInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.typography,
    marginBottom: 5,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  confirmButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  newReportButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: theme.colors.mutedSecondary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  newReportButtonText: {
    color: theme.colors.white,
    fontSize: 16,
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
}));
