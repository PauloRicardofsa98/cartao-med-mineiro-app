import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { styles } from "@/utils/styles";
import { Partner } from "@/types/partner";
import { api } from "@/services/api";
import { City } from "@/types/city";

type ModalInfo = {
  type: "address" | "contact";
  partner: Partner | undefined;
};

export default function PartnerScreen() {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | undefined>();
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    type: "contact",
    partner: undefined,
  });

  useEffect(() => {
    setLoading(true);
    async function getCities() {
      try {
        const response = await api.get("/city");
        const cities = response.data.data;
        setCities(cities);
      } catch (error) {
        console.error(error);
      }
    }
    getCities();
    setLoading(false);
  }, []);

  const handleSelectedCity = async (city: City) => {
    setLoading(true);
    setOpen(false);
    setSelectedCity(city);
    await getPartners();
    setLoading(false);
  };

  const handleOpenModalInfo = async (
    partner: Partner,
    type: "contact" | "address",
  ) => {
    setModalInfo({ type: type, partner });
    setModalVisible(true);
  };

  async function getPartners() {
    try {
      const params = new URLSearchParams();

      params.append(
        "filters",
        JSON.stringify({ cityUuid: selectedCity?.uuid }),
      );

      const response = await api.get(`/partner`, { params });
      const partners = response.data.data;
      setPartners(partners);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleOpen = () => setOpen(!open);

  if (loading)
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color={"#042A43"} />
      </View>
    );

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="z-50 flex-1 items-center justify-center bg-black/50">
          <View className="flex w-72 items-center gap-3 rounded-xl bg-white p-5">
            <Text className="text-2xl">{modalInfo.partner?.name}</Text>
            <Text className="text-xl">
              {modalInfo.type === "address"
                ? modalInfo.partner?.address || "Endereço não informado"
                : modalInfo.partner?.phone || "Contato não informado"}
            </Text>
            <Button onPress={() => setModalVisible(false)} className="px-4">
              <Text>Fechar</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Animatable.View
        className={`flex flex-1 items-center ${!selectedCity ? "justify-center" : "justify-start"} pt-4`}
        animation={!selectedCity ? "pulse" : undefined}
        duration={1000}
        iterationCount={5}
      >
        <Pressable
          className="flex h-10 w-5/6 flex-row items-center justify-between rounded-xl bg-white px-4"
          style={styles.shadow}
          onPress={toggleOpen}
        >
          <Text className="text-xl text-black">Selecione a cidade</Text>
          {open ? (
            <ChevronUp size={25} className="text-black" />
          ) : (
            <ChevronDown size={25} className="text-black" />
          )}
        </Pressable>

        {open && (
          <View className="relative z-50 flex h-[85%] w-[90%] items-center justify-center">
            <ScrollView
              className="absolute top-5 z-50 flex h-full w-full min-w-[8rem] gap-3 rounded-xl bg-white py-3"
              contentContainerStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              style={styles.shadow_sm}
            >
              {cities.map((city, index) => (
                <View
                  key={index}
                  className="h-10 w-[90%]"
                  style={styles.shadow}
                >
                  <Button
                    variant="outline"
                    className="h-10 w-full items-start rounded-lg px-4 font-normal"
                    onPress={() => handleSelectedCity(city)}
                  >
                    {city.name} - {city.state}
                  </Button>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {!open && selectedCity && (
          <ScrollView
            className="mt-4 w-full p-4"
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
            }}
          >
            {partners.map((partner, index) => (
              <View
                key={index}
                className="w-full items-center justify-center gap-2 rounded-xl bg-white py-4"
                style={styles.shadow}
              >
                <View className="h-64 w-[95%] rounded-xl">
                  <Image
                    source={{
                      uri: `https://apiv2.cartaomedmineiro.com.br/upload/${partner.banner}`,
                      // uri: `http://192.168.18.95:8000/upload/${partner.banner}`,
                    }}
                    className="h-full w-full rounded-xl"
                    resizeMode="contain"
                  />
                </View>

                <Text className="text-2xl font-bold text-black">
                  {partner.name}
                </Text>
                <Text className="text-xl text-black">{partner.benefit}</Text>
                <View className="flex flex-row items-center justify-center gap-1 px-2">
                  <Button
                    className="h-11 flex-1"
                    onPress={() => handleOpenModalInfo(partner, "address")}
                  >
                    Contato
                  </Button>
                  <Button
                    className="h-11 flex-1"
                    onPress={() => handleOpenModalInfo(partner, "contact")}
                  >
                    Endereço
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </Animatable.View>
    </>
  );
}
