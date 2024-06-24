import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

export const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...drawerProps}>
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
        <DrawerItemList {...drawerProps} />
      </LinearGradient>
    </DrawerContentScrollView>
  );
};
