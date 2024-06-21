import { Button } from "@/components/ui/button";
import { View, Text, ImageBackground, Image } from "react-native";

export const InitialPage = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/initial/background_index.png")}
        className="w-full h-full flex items-center justify-end"
      >
        <Image source={require("../../assets/images/initial/medic.png")} />
        <View className=" w-[430px] h-72 bg-white rounded-t-[50px] flex items-center justify-center p-5 gap-4">
          <Text className=" text-3xl font-bold text-primary text-center">
            Seja bem-vindo(a) ao futuro da saúde!
          </Text>
          <Button className=" w-80">
            <Text className="text-white font-semibold text-xl">Entrar</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};
