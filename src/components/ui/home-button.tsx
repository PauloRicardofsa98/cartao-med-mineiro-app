import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Pressable, PressableProps } from "react-native";
import { Badge } from "./badge";

interface HomeButtonProps extends PressableProps {
  Icon: LucideIcon;
  text: string;
  available?: boolean;
}

export const HomeButton = ({
  Icon,
  text,
  available = true,
  ...rest
}: HomeButtonProps) => {
  return (
    <View
      className="m-1 flex h-28 w-28 items-center justify-center rounded-xl bg-white"
      style={styles.shadow}
    >
      <Pressable
        className="flex h-full w-full items-center justify-center"
        {...rest}
      >
        <View className="flex h-1/2 items-center justify-end">
          <View className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
            <Icon size={25} className="text-white" />
          </View>
        </View>
        <View className="flex h-1/2 items-center justify-center">
          {available ? (
            <Text className="text-center text-sm">{text}</Text>
          ) : (
            <Badge label="em breve" className="z-50" />
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
});
