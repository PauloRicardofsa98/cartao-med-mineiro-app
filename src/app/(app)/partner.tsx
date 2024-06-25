import { View, Text, Pressable, ScrollView, Image } from "react-native";

import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { styles } from "@/utils/styles";

export default function PartnerScreen() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <View className="flex flex-1 items-center justify-center pt-4">
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
        <View className="relative z-50 flex h-auto w-[90%] items-center justify-center">
          <ScrollView
            className="absolute top-5 z-50 flex w-full min-w-[8rem] gap-3 rounded-xl bg-white p-3"
            style={styles.shadow_sm}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} className="h-10 w-[90%]" style={styles.shadow}>
                <Button
                  variant="outline"
                  className="h-10 w-full items-start rounded-lg px-4 font-normal"
                >
                  Formosa - Goiás
                </Button>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        className="mt-4 w-full p-4"
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <View
            key={index}
            className="w-full items-center justify-center gap-2 rounded-xl bg-white py-4"
            style={styles.shadow}
          >
            <View className="h-64 w-[95%] rounded-xl">
              <Image
                source={require("../../assets/images/partner.png")}
                className="h-full w-full rounded-xl"
                resizeMode="contain"
              />
            </View>

            <Text className="text-2xl font-bold text-black">
              nome do parceiro
            </Text>
            <Text className="text-xl text-black">Beneficio do parceiro</Text>
            <View className="flex flex-row items-center justify-center gap-1 px-2">
              <Button className="h-11 flex-1">Contato</Button>
              <Button className="h-11 flex-1">Endereço</Button>
              <Button className="h-11 flex-1">Localização</Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
