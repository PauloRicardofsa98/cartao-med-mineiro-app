import { Button } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { Platform, View } from "react-native";
import WebView from "react-native-webview";

export default function ViewGuide() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1, width: "100%", backgroundColor: "red", zIndex: 1 }}
        source={{
          uri: `http://192.168.18.95:3000/printer-guide-gas/${uuid}?type=customer_authorization_guide`,
        }}
        injectedJavaScript={`
          const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
          if (!iOS) {
            const meta = document.createElement('meta');
            let initialScale = 1;
            if(screen.width <= 800) {
             initialScale = ((screen.width / window.innerWidth) + 0.1).toFixed(2);
            }
            const content = 'width=device-width, initial-scale=' + initialScale ;
            meta.setAttribute('name', 'viewport');
            meta.setAttribute('content', content);
            document.getElementsByTagName('head')[0].appendChild(meta);
          }
        `}
        scalesPageToFit={Platform.OS === "ios"}
      />
      <View className="flex h-24 w-full items-center justify-center bg-primary">
        <Button
          className="h-12 w-40"
          variant="outline"
          onPress={() => router.back()}
        >
          voltar
        </Button>
      </View>
    </View>
  );
}
