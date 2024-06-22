import { styled } from "nativewind";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

const ButtonStyled = ({ children, ...rest }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      className="flex h-14 items-center justify-center rounded-xl bg-primary"
      {...rest}
    >
      <Text className="text-xl font-semibold text-white"> {children}</Text>
    </TouchableOpacity>
  );
};
export const Button = styled(ButtonStyled);
