import { StyleSheet } from "react-native";
import { Pressable, PressableProps, Text } from "react-native";

interface DrawerButtonProps extends PressableProps {
  title?: string;
  isFocused?: boolean;
}

export const DrawerButton = ({
  title = "",
  isFocused = false,
  ...rest
}: DrawerButtonProps) => {
  return (
    <Pressable
      className={`mb-2 flex h-10 w-[90%] items-start justify-center rounded-lg bg-white px-4 ${isFocused ? "bg-secondary" : ""}`}
      style={styles.shadow}
      {...rest}
    >
      <Text className={`text-xl ${isFocused && "font-bold text-white"}`}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
