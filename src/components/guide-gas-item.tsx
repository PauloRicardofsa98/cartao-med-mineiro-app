import { styles } from "@/utils/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "./ui/button";
import { GuideGas } from "@/types/guide-gas";
import { SquareArrowOutUpRight } from "lucide-react-native";
import { router } from "expo-router";

export const GuideGasItem = ({ guide }: { guide: GuideGas }) => {
  const currentTime = new Date();
  const twentyFourHoursAgo = new Date(
    currentTime.getTime() - 24 * 60 * 60 * 1000,
  );
  const validGuide = new Date(guide.created_at) > twentyFourHoursAgo;

  return (
    <TouchableOpacity
      className="flex h-36 w-full flex-row items-center justify-between rounded-2xl bg-white"
      style={styles.shadow}
      onPress={() => router.push(`/guide-gas/${guide.uuid}`)}
    >
      <View className="flex h-full flex-1 justify-center px-4">
        <View>
          <Text className="text-base font-semibold">Número da guia:</Text>
          <Text className="text-base">{guide.id}</Text>
        </View>
        <View>
          <Text className="text-base font-semibold">Nome do fornecedor:</Text>
          <Text className="text-base">{guide.supplier_gas.name}</Text>
        </View>
        <View>
          <Text className="text-base font-semibold">Data</Text>
          <Text className="text-base">
            {new Date(guide.created_at).toLocaleString()}
          </Text>
        </View>
      </View>
      <Button
        className={`h-42 flex h-full w-16 items-center justify-center rounded-r-2xl ${validGuide ? "bg-primary" : "bg-[#627D8A]"} rounded-l-none`}
        disabled={true}
      >
        <SquareArrowOutUpRight className="text-white" />
      </Button>
    </TouchableOpacity>
  );
};
