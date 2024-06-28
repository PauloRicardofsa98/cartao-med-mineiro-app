import { SessionProvider } from "@/contexts/auth";
import { Slot } from "expo-router";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  initialRouteName: "(app)",
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
      <Toast />
    </SessionProvider>
  );
}
