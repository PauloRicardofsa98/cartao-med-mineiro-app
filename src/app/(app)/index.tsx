import { HomeButton } from "@/components/ui/home-button";
import { useSession } from "@/contexts/auth";
import { api } from "@/services/api";
import { maskCpfCnpj } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Container,
  DiamondPlus,
  Flame,
  Handshake,
  HeartPulse,
  LogOut,
  MessageCircleMore,
  ReceiptText,
  ScanFace,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Linking, SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { user, signOut } = useSession();
  const [loadingSupport, setLoadingSupport] = useState(false);

  const openSupport = async () => {
    const supported = await Linking.canOpenURL(
      "https://api.whatsapp.com/send?phone=5538998760623&text=Ol%C3%A1,%20vim%20pelo%20app.%20Voc%C3%AA%20pode%20me%20ajudar?",
    );

    if (supported) {
      await Linking.openURL(
        "https://api.whatsapp.com/send?phone=5538998760623&text=Ol%C3%A1,%20vim%20pelo%20app.%20Voc%C3%AA%20pode%20me%20ajudar?",
      );
    } else {
      Alert.alert(`Numero do nosso WhatsApp (38) 99876-0623`);
    }
  };

  const openService = async () => {
    if (!user?.subscriptionActive) {
      Toast.show({
        type: "error",
        text1:
          "Acesso negado, Para acessar essa funcionalidade é necessário estar com a assinatura ativa.",
      });
      return;
    }
    try {
      setLoadingSupport(true);
      const response = await api.get(`gateway/rapidoc/service/${user?.uuid}`);
      const supported = await Linking.canOpenURL(response.data.data);

      if (supported) {
        await Linking.openURL(response.data.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Não foi possível abrir o atendimento, contate o suporte!",
        });
      }
      setLoadingSupport(false);
    } catch (error) {
      Toast.show({
        type: "error",

        text1: "Não foi possível abrir o atendimento!",
        text2: "Tente novamente ou contate o suporte.",
      });
      setLoadingSupport(false);
    }
  };

  const handlePush = (route: string) => {
    if (!user?.subscriptionActive) {
      Toast.show({
        type: "error",
        text1:
          "Acesso negado, Para acessar essa funcionalidade é necessário estar com a assinatura ativa.",
      });
      return;
    }

    router.push(route);
  };

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
          <View className="flex h-52 w-80 items-center justify-center rounded-xl">
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
          {user?.subscriptionActive ? (
            <Text className="mt-2 text-2xl font-semibold">
              O que você precisa hoje?
            </Text>
          ) : (
            <Text className="mt-2 text-2xl font-semibold text-red-500">
              Sua assinatura esta suspensa
            </Text>
          )}

          <View className="flex h-full w-full flex-row flex-wrap items-center justify-center pt-2">
            <HomeButton
              Icon={HeartPulse}
              text="Solicitar atendimento"
              loading={loadingSupport}
              onPress={openService}
              block={!user?.subscriptionActive}
            />
            <HomeButton
              Icon={ScanFace}
              text="Carteirinha"
              onPress={() => handlePush("card-identity")}
              block={!user?.subscriptionActive}
            />
            <HomeButton
              Icon={MessageCircleMore}
              text="Suporte"
              onPress={openSupport}
            />
            <HomeButton
              Icon={ReceiptText}
              text="2º via de fatura"
              onPress={() => router.push("/payments")}
            />
            <HomeButton
              Icon={Handshake}
              text="Parceiros"
              onPress={() => handlePush("/partner")}
              block={!user?.subscriptionActive}
            />
            <HomeButton
              Icon={DiamondPlus}
              text="Clube de Benefícios"
              available={false}
              block={!user?.subscriptionActive}
            />
            <HomeButton
              Icon={Container}
              text="Fornecedor de gás"
              onPress={() => handlePush("/supplier-gas")}
              block={!user?.subscriptionActive}
            />
            <HomeButton
              Icon={Flame}
              text="Solicitar guia desconto gas"
              onPress={() => handlePush("/guide-gas")}
              block={!user?.subscriptionActive}
            />
            <HomeButton Icon={LogOut} text="Sair" onPress={signOut} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
