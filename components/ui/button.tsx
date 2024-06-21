import { styled } from "nativewind";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const ButtonStyled = ({ children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-primary h-14 rounded-xl items-center justify-center flex"
      {...rest}
    >
      <Text className="text-white font-semibold text-xl"> {children}</Text>
    </TouchableOpacity>
  );
};
export const Button = styled(ButtonStyled);
