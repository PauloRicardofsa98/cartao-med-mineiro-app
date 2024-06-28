import { HomeButton } from "@/components/ui/home-button";
import { useSession } from "@/contexts/auth";
import { maskCpfCnpj } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { HeartPulse, MessageCircleMore, ScanFace } from "lucide-react-native";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useSession();
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#042A43", "#157AA2"]}
        className="flex h-full w-full items-center justify-center"
      >
        <View className="flex h-[40%] w-full flex-col items-center justify-center px-5">
          <View className="mb-2 flex w-full items-start justify-center">
            <Text className="text-start text-2xl text-white">
              Olá, <Text className="font-bold">{user?.name.split(" ")[0]}</Text>
            </Text>
          </View>
          <View className="flex h-52 w-80 items-center justify-center rounded-xl bg-red-300">
            <Image
              source={require("../../assets/images/card.png")}
              className="h-52 w-96 rounded-xl"
            />
            <View className="absolute left-0 top-1">
              <Text className="text-lg font-bold">{user?.plan}</Text>
            </View>
            <View className="absolute bottom-0 right-0">
              <Text className="text-sm font-semibold">{user?.name}</Text>
              <Text className="text-sm font-semibold">
                CPF: {maskCpfCnpj(user?.cpfOrCnpj || "")}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex h-[60%] w-full items-center justify-center rounded-t-[50px] bg-white px-3 py-4">
          <Text className="mt-2 text-2xl font-semibold">
            O que você precisa hoje?
          </Text>

          <View className="flex h-full w-full flex-row flex-wrap items-center justify-center pt-2">
            <HomeButton Icon={HeartPulse} text="Solicitar atendimento" />
            <HomeButton Icon={ScanFace} text="Carteirinha" />
            <HomeButton Icon={MessageCircleMore} text="Suporte" />
            <HomeButton Icon={HeartPulse} text="2º via de boleto" />
            <HomeButton
              Icon={HeartPulse}
              text="Parceiros"
              onPress={() => router.push("/partner")}
            />
            <HomeButton Icon={HeartPulse} text="Clube de Benefícios" />
            <HomeButton
              Icon={HeartPulse}
              text="Fornecedor de gás"
              available={false}
            />
            <HomeButton Icon={HeartPulse} text="Guia de Gás" />
            <HomeButton Icon={HeartPulse} text="Fazer pedido" />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
