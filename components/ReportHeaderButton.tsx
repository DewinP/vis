import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const ReportHeaderButton = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.button}>
      <Text>Last Report 1 hour ago</Text>
    </View>
  );
};

export default ReportHeaderButton;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  icon: {
    color: theme.colors.primary,
    marginRight: 5,
  },
}));
