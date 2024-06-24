import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...drawerProps}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.background}
      >
        <DrawerItemList {...drawerProps} />
      </LinearGradient>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 20,
  },
});
