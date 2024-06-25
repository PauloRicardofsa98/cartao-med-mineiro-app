import { styles } from "@/utils/styles";
import { Text } from "react-native";
import { ScrollView, View } from "react-native";

export default function ClubScreen() {
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
            className="h-42 w-[95%] rounded-2xl bg-white p-4"
            style={styles.shadow}
          >
            <View>
              <Text className="text-base font-semibold">Nome:</Text>
              <Text className="text-base">Paulo Ricardo de Souza Santos</Text>
            </View>
            <View>
              <Text className="text-base font-semibold">Endereço:</Text>
              <Text className="text-base">
                Rua das Flores, 123, Bairro Primavera, Cidade Verde, Estado do
                Sol Nascente, CEP: 12345-678
              </Text>
            </View>
            <View>
              <Text className="text-base font-semibold">Contato:</Text>
              <Text className="text-base">(61) 99999-9999</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
