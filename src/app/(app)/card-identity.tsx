import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/auth";
import { maskCpfCnpj } from "@/utils/helper";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";

export default function ClubScreen() {
  const { user } = useSession();
  return (
    <View className="flex h-full w-full items-center justify-center">
      <View className="flex w-full flex-1 items-center justify-center">
        <View className="relative flex h-[80%] w-[80%] items-center justify-center rounded-2xl bg-primary">
          <Image
            source={require("../../assets/images/card_vertical.png")}
            className="h-full w-full rounded-2xl"
          />
          <View className="absolute bottom-[15%] left-[-15%] -rotate-90">
            <Text className="text-lg font-bold">{user?.plan}</Text>
          </View>
          <View className="absolute bottom-[60%] right-[-10%] -rotate-90">
            <Text className="text-sm font-semibold">{user?.name}</Text>
            <Text className="text-sm font-semibold">
              CPF: {maskCpfCnpj(user?.cpfOrCnpj || "")}
            </Text>
          </View>
        </View>
      </View>
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
