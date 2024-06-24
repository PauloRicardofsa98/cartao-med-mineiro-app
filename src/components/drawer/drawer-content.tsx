import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerButton } from "./drawer-button";
import { View } from "react-native-animatable";
import { X } from "lucide-react-native";
import { Pressable } from "react-native";

export const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center">
      <Pressable className="w-full items-end justify-center px-3">
        <X
          size={35}
          className="text-black"
          onPress={() => {
            drawerProps.navigation.closeDrawer();
          }}
        />
      </Pressable>
      {drawerProps.state.routes.map((route, index) => {
        return (
          <DrawerButton
            key={index}
            title={route.name}
            isFocused={drawerProps.state.index === index}
            onPress={() => {
              drawerProps.navigation.navigate(route.name);
            }}
          />
        );
      })}
    </View>
  );
};
