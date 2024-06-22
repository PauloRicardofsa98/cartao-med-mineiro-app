import { Button } from "@/components/ui/button";
import { InputIcon } from "@/components/ui/input-icon";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
} from "react-native";

export const Login = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/login/background.png")}
      className="flex h-full w-full flex-1 items-center justify-center bg-cover bg-center"
    >
      <KeyboardAvoidingView
        className="flex h-full w-full flex-1 items-center justify-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex flex-col items-center justify-center">
          <Image
            source={require("../../assets/images/logo.png")}
            className="h-52 w-80"
          />

          <InputIcon placeholder="CPF" />

          <InputIcon placeholder="Senha" secureTextEntry />

          <Button className="mt-4 px-12">Acessar</Button>
        </View>
      </KeyboardAvoidingView>
      <Text className="absolute bottom-4 text-center text-lg font-semibold text-primary">
        Desenvolvido por Paulo Ricardo
      </Text>
    </ImageBackground>
  );
};
