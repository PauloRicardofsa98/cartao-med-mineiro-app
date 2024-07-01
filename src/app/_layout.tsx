import { SessionProvider } from "@/contexts/auth";
import { Slot } from "expo-router";
import "react-native-reanimated";
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from "react-native-toast-message";

export const unstable_settings = {
  initialRouteName: "(app)",
};

const toastProps: BaseToastProps = {
  text1Style: {
    fontSize: 18,
  },
  text2Style: {
    fontSize: 14,
  },

  text2NumberOfLines: 0,
  text1NumberOfLines: 0,
  style: {
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
};

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "#00B74A",
        },
      ]}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "red",
        },
      ]}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "#FFC107",
        },
      ]}
    />
  ),
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
      <Toast config={toastConfig} visibilityTime={5000} position="top" />
    </SessionProvider>
  );
}
