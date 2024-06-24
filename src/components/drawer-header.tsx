import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const DrawerHeader = () => {
  return (
    <LinearGradient
      colors={["#052F47", "#1990BD"]}
      style={StyleSheet.absoluteFill}
    />
  );
};
