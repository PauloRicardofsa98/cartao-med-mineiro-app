import { styles } from "@/utils/styles";
import { View, Text, Image } from "react-native";
import { Button } from "./ui/button";
import { Partner } from "@/types/partner";

interface PartnerItemItemProps {
  partner: Partner;
  handleOpenModalInfo: (partner: Partner, type: "address" | "contact") => void;
}

export const PartnerItem = ({
  partner,
  handleOpenModalInfo,
}: PartnerItemItemProps) => {
  return (
    <View
      className="w-96 items-center justify-center gap-2 rounded-xl bg-white py-4"
      style={styles.shadow}
    >
      <View className="h-64 w-[95%] rounded-xl">
        <Image
          source={{
            uri: `https://apiv2.cartaomedmineiro.com.br/upload/${partner.banner}`,
          }}
          className="h-full w-full rounded-xl"
          resizeMode="contain"
        />
      </View>

      <Text className="text-2xl font-bold text-black">{partner.name}</Text>
      <Text className="text-xl text-black">{partner.benefit}</Text>
      <View className="flex flex-row items-center justify-center gap-1 px-2">
        <Button
          className="h-11 flex-1"
          onPress={() => handleOpenModalInfo(partner, "contact")}
        >
          Contato
        </Button>
        <Button
          className="h-11 flex-1"
          onPress={() => handleOpenModalInfo(partner, "address")}
        >
          Endereço
        </Button>
      </View>
    </View>
  );
};
