import { styles } from "@/utils/styles";
import { SquareArrowOutUpRight } from "lucide-react-native";
import { Text } from "react-native";
import { ScrollView, View } from "react-native";

export default function GuideGasScreen() {
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
        {Array.from({ length: 10 }).map((_, index) => (
          <View
            key={index}
            className="flex h-32 w-[95%] flex-row items-center justify-between rounded-2xl bg-white"
            style={styles.shadow}
          >
            <View className="flex h-full justify-center px-4">
              <View>
                <Text className="text-base font-semibold">Número da guia:</Text>
                <Text className="text-base">123456</Text>
              </View>
              <View>
                <Text className="text-base font-semibold">
                  Nome do fornecedor:
                </Text>
                <Text className="text-base">Renato gás</Text>
              </View>
            </View>
            <View
              className={`h-42 flex h-full w-16 items-center justify-center rounded-r-2xl bg-primary`}
            >
              <SquareArrowOutUpRight className="text-white" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
