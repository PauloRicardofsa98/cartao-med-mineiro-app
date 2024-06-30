import { api } from "@/services/api";
import { SupplierGas } from "@/types/supplier-gas";
import { styles } from "@/utils/styles";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { ScrollView, View } from "react-native";

export default function ClubScreen() {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<SupplierGas[]>([]);

  useEffect(() => {
    setLoading(true);
    async function getSuppliers() {
      try {
        const response = await api.get("/supplier/gas");
        const listSupplier = response.data.data;
        setSuppliers(listSupplier);
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
    getSuppliers();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#042A43" />
      </View>
    );
  }

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
        {suppliers.map((supplier, index) => (
          <View
            key={index}
            className="h-42 w-[95%] rounded-2xl bg-white p-4"
            style={styles.shadow}
          >
            <View>
              <Text className="text-base font-semibold">Nome:</Text>
              <Text className="text-base">{supplier.name}</Text>
            </View>
            <View>
              <Text className="text-base font-semibold">Endereço:</Text>
              <Text className="text-base">
                {supplier.address}, {supplier.city}, {supplier.state}, CEP:{" "}
                {supplier.zipCode}
              </Text>
            </View>
            <View>
              <Text className="text-base font-semibold">Contato:</Text>
              <Text className="text-base">{supplier.phone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
function signOut() {
  throw new Error("Function not implemented.");
}
