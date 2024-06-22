import * as Animatable from "react-native-animatable";
import { Button } from "@/components/ui/button";
import { InputIcon } from "@/components/ui/input-icon";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
} from "react-native";
import { Lock, User2 } from "lucide-react-native";

type LoginProps = {
  cpf: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginProps>();

  useEffect(() => {
    register("cpf");
    register("password");
  }, [register]);

  const onSubmit: SubmitHandler<LoginProps> = (data) => console.log(data);

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
          <Animatable.Image
            animation={"zoomIn"}
            source={require("../../assets/images/logo.png")}
            className="h-52 w-80"
          />

          <InputIcon
            Icon={User2}
            placeholder="CPF"
            onChangeText={(text) => setValue("cpf", text)}
            {...register("cpf", { required: true })}
            error={!!errors.cpf}
          />

          <InputIcon
            Icon={Lock}
            placeholder="Senha"
            onChangeText={(text) => setValue("password", text)}
            secureTextEntry
            {...register("password", { required: true })}
            error={!!errors.password}
          />

          <Button className="mt-4 px-12" onPress={handleSubmit(onSubmit)}>
            Acessar
          </Button>
        </View>
      </KeyboardAvoidingView>
      <Text className="absolute bottom-4 text-center text-lg font-semibold text-primary">
        Desenvolvido por Paulo Ricardo
      </Text>
    </ImageBackground>
  );
};
