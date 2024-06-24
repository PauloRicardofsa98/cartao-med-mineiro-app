import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Pressable, PressableProps } from "react-native";

interface HomeButtonProps extends PressableProps {
  Icon: LucideIcon;
  text: string;
}

export const HomeButton = ({ Icon, text, ...rest }: HomeButtonProps) => {
  return (
    <View
      className="m-1 flex h-28 w-28 items-center justify-center rounded-xl bg-white"
      style={styles.shadow}
    >
      <Pressable
        className="flex h-full w-full items-center justify-center"
        {...rest}
      >
        <View className="rounded-full bg-secondary p-4">
          <Icon size={25} className="text-white" />
        </View>
        <Text className="text-center text-base">{text}</Text>
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
