import { GuideGasItem } from "@/components/guide-gas-item";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/auth";
import { api } from "@/services/api";
import { GuideGas } from "@/types/guide-gas";
import { HelperRequestParams } from "@/types/helpers";
import { AxiosError } from "axios";
import { router, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function GuideGasScreen() {
  const { user, signOut } = useSession();

  const [loading, setLoading] = useState(false);
  const [loadingFlatList, setLoadingFlatList] = useState(false);
  const [guides, setGuides] = useState<GuideGas[]>([]);

  useEffect(() => {
    setLoading(true);
    getGuides({
      filters: { customerUuid: user?.holderUuid },
      includes: ["supplier_gas"],
    });
    setLoading(false);
  }, []);

  useFocusEffect(() => {
    setLoading(true);
    getGuides({
      filters: { customerUuid: user?.holderUuid },
      includes: ["supplier_gas"],
    });
    setLoading(false);
  });

  async function getGuides(helperRequestParams?: HelperRequestParams) {
    try {
      const params = new URLSearchParams();
      if (helperRequestParams) {
        const { includes, filters } = helperRequestParams;

        if (includes) {
          params.append("includes", includes.join(","));
        }
        if (filters) {
          params.append("filters", JSON.stringify(filters));
        }
      }

      const response = await api.get("/guide-gas", { params });
      const guides = response.data.data as GuideGas[];
      if (guides.length > 0) {
        guides.sort((a, b) => {
          const dateA = new Date(b.created_at);
          const dateB = new Date(a.created_at);
          return dateA.getTime() - dateB.getTime();
        });
      }

      setGuides(guides);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          Alert.alert("Sessão expirada. Faça login novamente.");
          signOut();
        }
      }
      console.error(error);
    }
  }

  const handleRefresh = () => {
    setLoadingFlatList(true);
    getGuides({
      filters: { customerUuid: user?.holderUuid },
      includes: ["supplier_gas"],
    });
    setLoadingFlatList(false);
  };

  const handleNewRequest = () => {
    const guideLessTwentyFourHours = guides.some((guide) => {
      const currentTime = new Date();
      const guideDate = new Date(guide.created_at);

      return (
        guideDate.getMonth() === currentTime.getMonth() &&
        guideDate.getFullYear() === currentTime.getFullYear() &&
        guideDate.getDate() === currentTime.getDate()
      );
    });
    if (guideLessTwentyFourHours) {
      Toast.show({
        type: "info",
        text1: "Você já tem um pedido de gás este mês",
      });
      return;
    }

    router.push("/guide-gas/new-request");
  };

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View className="flex flex-1 items-center justify-start">
      <FlatList
        data={guides}
        keyExtractor={(item) => item.uuid}
        ListHeaderComponent={() => (
          <Text className="text-center text-2xl font-semibold italic">
            Meus pedidos
          </Text>
        )}
        renderItem={({ item }) => <GuideGasItem guide={item} />}
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 15,
          padding: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loadingFlatList}
            onRefresh={handleRefresh}
            tintColor={"#042a43"}
          />
        }
      />

      <View className="flex h-24 w-full flex-row items-center justify-around bg-primary">
        <Button
          className="h-12 w-36"
          variant="secondary"
          onPress={() => router.back()}
        >
          Voltar
        </Button>
        <Button
          className="h-12 w-36"
          variant="outline"
          onPress={handleNewRequest}
        >
          Novo pedido
        </Button>
      </View>
    </View>
  );
}
