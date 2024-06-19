import { Text, StyleSheet, Platform, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Pagina </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
