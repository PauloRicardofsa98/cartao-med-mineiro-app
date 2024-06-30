import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DrawerButton } from "./drawer-button";
import { View } from "react-native-animatable";
import { X } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { translator } from "@/utils/translator";
import { useSession } from "@/contexts/auth";

export const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
  const { user } = useSession();

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
      {!user?.subscriptionActive && (
        <Text className="mt-2 text-2xl font-semibold text-red-500">
          Assinatura suspensa
        </Text>
      )}
      {drawerProps.state.routes.map((route, index) => {
        const excludedRoutes = ["guide-gas/[uuid]", "guide-gas/new-request"];
        const excludedRoutesInadimplente = [
          "card-identity",
          "club",
          "partner",
          "supplier-gas",
          "guide-gas/index",
        ];
        if (excludedRoutes.includes(route.name)) return null;
        if (
          !user?.subscriptionActive &&
          excludedRoutesInadimplente.includes(route.name)
        )
          return null;

        return (
          <DrawerButton
            key={index}
            title={translator[route.name]}
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
