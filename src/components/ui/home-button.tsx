import { Hourglass, LucideIcon } from "lucide-react-native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Pressable, PressableProps } from "react-native";
import { Badge } from "./badge";
import * as Animatable from "react-native-animatable";

interface HomeButtonProps extends PressableProps {
  Icon: LucideIcon;
  text: string;
  available?: boolean;
  loading?: boolean;
}

export const HomeButton = ({
  Icon,
  text,
  available = true,
  loading = false,
  ...rest
}: HomeButtonProps) => {
  return (
    <Animatable.View
      className="m-1 flex h-28 w-28 items-center justify-center rounded-xl bg-white"
      style={styles.shadow}
      animation={"zoomIn"}
    >
      {loading ? (
        <View>
          <ActivityIndicator size={"large"} color={"#042A43"} />
        </View>
      ) : (
        <Pressable
          className="flex h-full w-full items-center justify-center"
          {...rest}
        >
          <View className="flex h-1/2 items-center justify-end">
            <View className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              {available ? (
                <Icon size={25} className="text-white" />
              ) : (
                <Hourglass size={25} className="text-white" />
              )}
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
      )}
    </Animatable.View>
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
