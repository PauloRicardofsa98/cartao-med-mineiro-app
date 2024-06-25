import { styles } from "@/utils/styles";
import { styled } from "nativewind";
import { Text, TouchableOpacityProps, Pressable } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "danger" | "outline";
}

const variants: { [key: string]: { view: string; text: string } } = {
  primary: {
    view: "bg-primary",
    text: "text-white",
  },
  secondary: {
    view: "bg-secondary",
    text: "text-white",
  },
  danger: {
    view: "bg-danger",
    text: "text-white",
  },
  outline: {
    view: "bg-white",
    text: "text-primary",
  },
};

const ButtonStyled = ({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      className={`flex h-14 items-center justify-center rounded-xl ${variants[variant].view}`}
      style={styles.shadow}
      {...rest}
    >
      <Text className={`text-xl ${variants[variant].text}`}>{children}</Text>
    </Pressable>
  );
};
export const Button = styled(ButtonStyled);
