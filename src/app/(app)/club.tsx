import { Button } from "@/components/ui/button";
import { Image } from "react-native";
import { ScrollView, View } from "react-native";

export default function ClubScreen() {
  return (
    <View className="flex flex-1 items-center justify-center">
      <ScrollView
        className="w-full p-4"
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} className="h-40 w-[95%] rounded-xl">
            <Image
              source={require("../../assets/images/clube.png")}
              className="h-full w-full rounded-xl"
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
      <View className="flex h-24 w-full items-center justify-center bg-primary">
        <Button className="h-12 w-40" variant="outline">
          Acessar site
        </Button>
      </View>
    </View>
  );
}
