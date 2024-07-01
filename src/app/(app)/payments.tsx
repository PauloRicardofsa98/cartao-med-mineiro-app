import { useSession } from "@/contexts/auth";
import { api } from "@/services/api";
import { PaymentAsaas } from "@/types/asaas";
import { convertDate } from "@/utils/helper";
import { AxiosError } from "axios";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function PaymentsScreen() {
  const { user, signOut } = useSession();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentAsaas[]>([]);

  useEffect(() => {
    async function getPayments() {
      setLoading(true);
      try {
        const response = await api.get(
          `/subscription/payments/${user?.subscriptionUuid}`,
        );
        const data = response.data as PaymentAsaas[];
        if (data.length > 0) {
          data.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA.getTime() - dateB.getTime();
          });
        }
        setPayments(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            Alert.alert("Sessão expirada. Faça login novamente.");
            signOut();
          }
        }
        console.error(error);
        setLoading(false);
      }
    }
    getPayments();
  }, []);

  const openPayment = async (link: string | undefined) => {
    if (!link)
      return Alert.alert(
        `Não foi possível abrir o link de pagamento. Contate o suporte!`,
      );

    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(
        `Não foi possível abrir o link de pagamento. Contate o suporte!`,
      );
    }
  };

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex flex-1 p-5">
      <Animatable.View className="mb-2 flex flex-row items-center justify-center rounded-xl bg-black/10">
        <Text className="text-4xl font-bold text-black">{user?.plan}</Text>
        <ChevronDown />
      </Animatable.View>
      <View className="flex flex-1 items-center justify-center border-2 border-dashed border-black">
        <ScrollView
          className="w-full bg-black/10 p-4"
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {payments.map((payment, index) => {
            const color = () => {
              if (payment.status === "PENDING")
                return { text: "text-orange-500", border: "border-orange-500" };
              if (payment.status === "RECEIVED")
                return { text: "text-green-500", border: "border-green-500" };
              if (payment.status === "CONFIRMED")
                return { text: "text-green-500", border: "border-green-500" };
              if (payment.status === "OVERDUE")
                return { text: "text-red-500", border: "border-red-500" };
              if (payment.status === "RECEIVED_IN_CASH")
                return { text: "text-green-600", border: "border-green-600" };
            };

            const status = () => {
              if (payment.status === "PENDING") return "Pendente";
              if (payment.status === "RECEIVED") return "Recebido";
              if (payment.status === "CONFIRMED") return "Confirmado";
              if (payment.status === "OVERDUE") return "Atrasado";
              if (payment.status === "RECEIVED_IN_CASH") return "Recebido";
            };

            return (
              <TouchableOpacity
                key={index}
                className={`flex h-16 w-full flex-row items-center justify-around rounded-lg border-l-[8px] bg-white ${color()?.border}`}
                onPress={() => openPayment(payment.invoiceUrl)}
              >
                <View>
                  <Text className={`text-lg font-semibold ${color()?.text}`}>
                    {convertDate(payment.dueDate)}
                  </Text>
                  <Text className="text-base text-slate-400">{payment.id}</Text>
                </View>
                <View>
                  <Text className={`text-2xl font-bold ${color()?.text}`}>
                    {payment.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                  <Text className="text-base text-slate-400">{status()}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
