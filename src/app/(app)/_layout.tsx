import { DrawerContent } from "@/components/drawer-content";
import { useSession } from "@/contexts/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";

export default function AppLayout() {
  const { isAuth } = useSession();
  if (!isAuth) {
    console.log("Não Logado");
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#042A43",
        },
      }}
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
      <Drawer.Screen name="partner" options={{ title: "parceiros" }} />
    </Drawer>
  );
}
