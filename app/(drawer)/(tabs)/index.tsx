import React, { useEffect, useState } from "react";
import SpotItem from "@/components/SpotItem";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { supabase } from "@/utils/supabase";
import { Database } from "@/database.types";
import { Spot } from "@/components/types";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data, error } = await supabase.from("spots").select("*");

      if (error) {
        console.error("Error fetching spots:", error);
      } else {
        setSpots(data as Spot[]);
      }
    };

    fetchSpots();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        {spots.map((spot) => (
          <SpotItem key={spot.id} spotInfo={spot} />
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
