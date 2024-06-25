import { DrawerContent } from "@/components/drawer/drawer-content";
import { useSession } from "@/contexts/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { AlignJustify } from "lucide-react-native";
import { StyleSheet } from "react-native";

export default function AppLayout() {
  const { isAuth } = useSession();
  if (!isAuth) {
    console.log("Não Logado");
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#042A43",
        },
        headerTintColor: "#fff",
        headerLeft: () => (
          <AlignJustify
            size={30}
            className="ml-4 text-white"
            onPress={navigation.toggleDrawer}
          />
        ),
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: " ",
          headerBackground: () => (
            <LinearGradient
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#042A43", "#157AA2"]}
              style={StyleSheet.absoluteFill}
            />
          ),
          headerStyle: {
            backgroundColor: "#042A43",
            shadowColor: "transparent",
            elevation: 0,
          },
        }}
      />
      <Drawer.Screen
        name="partner"
        options={{
          title: "Parceiros",
        }}
      />
      <Drawer.Screen
        name="club"
        options={{
          title: "Clube de benefícios",
        }}
      />
      <Drawer.Screen
        name="supplier-gas"
        options={{
          title: "Fornecedores de gás",
        }}
      />
    </Drawer>
  );
}
