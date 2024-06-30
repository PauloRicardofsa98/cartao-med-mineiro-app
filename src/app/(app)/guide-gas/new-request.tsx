import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/auth";
import { api } from "@/services/api";
import { GuideGasProps } from "@/types/guide-gas";
import { SupplierGas } from "@/types/supplier-gas";
import { styles } from "@/utils/styles";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function NewRequest() {
  const { user, signOut } = useSession();

  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierGas[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<
    SupplierGas | undefined
  >();

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

  async function createGuideGas() {
    setLoadingRequest(true);
    try {
      const data: GuideGasProps = {
        customerUuid: user?.holderUuid,
        supplierGasUuid: selectedSupplier?.uuid,
        observation:
          "Está guia de desconto é válida por 24 horas e deve ser validada pelo parceiro dentro desse período. Agradecemos por escolher nosso serviço e esperamos que você tenha uma excelente experiência.",
        createdBy: "Cliente App",
      };

      await api.post("/guide-gas", data);
      setLoadingRequest(false);
      setModalVisible(false);
      router.push("/guide-gas");
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : "";

      Toast.show({
        type: "error",
        text1: "Erro ao criar guia de desconto, tente novamente.",
        text2: message,
        visibilityTime: 4000,
      });
      setLoadingRequest(false);
      setModalVisible(false);
      router.push("/guide-gas");
    }
  }

  const handleSelectedSupplier = (supplier: SupplierGas) => {
    setSelectedSupplier(supplier);
    setOpen(false);
    toggleModal();
  };

  const toggleOpen = () => setOpen(!open);
  const toggleModal = () => setModalVisible(!modalVisible);

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#042A43" />
      </View>
    );
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="z-50 flex-1 items-center justify-center bg-black/50">
          {!loadingRequest ? (
            <View className="flex w-11/12 items-center gap-3 rounded-xl bg-white p-2">
              <Text className="text-xl font-bold">Confirmação de pedido</Text>
              <Text className="text-justify text-base">
                Ao clicar em "Solicitar Desconto", você confirma que revisou
                todas as informações fornecidas, concorda com os termos e
                condições, e autoriza o envio do pedido de desconto ao parceiro
                selecionado. A disponibilidade do desconto está sujeita à
                confirmação do parceiro, e você receberá uma notificação com a
                confirmação e os detalhes do desconto aplicado. Agradecemos por
                escolher nosso serviço e esperamos que você tenha uma excelente
                experiência de compra.
              </Text>
              <Button onPress={createGuideGas} className="px-4">
                <Text>Solicitar desconto</Text>
              </Button>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#042A43" />
          )}
        </View>
      </Modal>
      <View className="flex flex-1 items-center justify-start gap-4 p-5">
        <Text className="text-base">
          Escolha o fornecedor para que possamos realizar o pedido.
        </Text>
        <Pressable
          className="flex h-10 w-full flex-row items-center justify-between rounded-xl bg-white px-4"
          style={styles.shadow_sm}
          onPress={toggleOpen}
        >
          <Text className="text-xl text-black">Selecione o fornecedor</Text>
          {open ? (
            <ChevronUp size={25} className="text-black" />
          ) : (
            <ChevronDown size={25} className="text-black" />
          )}
        </Pressable>

        {open && (
          <View className="relative z-50 flex h-[85%] w-[90%] items-center justify-center">
            <ScrollView
              className="absolute top-5 z-50 flex h-full max-h-[80%] w-full min-w-[8rem] gap-3 rounded-xl bg-white py-3"
              contentContainerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              style={styles.shadow_sm}
            >
              {suppliers.map((supplier, index) => (
                <View
                  key={index}
                  className="h-10 w-[90%]"
                  style={styles.shadow}
                >
                  <Button
                    variant="outline"
                    className="h-10 w-full items-start rounded-lg px-4 font-normal"
                    onPress={() => handleSelectedSupplier(supplier)}
                  >
                    {supplier.name}
                  </Button>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}
