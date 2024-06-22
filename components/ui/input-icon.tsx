import { User } from "lucide-react-native";
import { styled } from "nativewind";
import { TextInput, TextInputProps, View } from "react-native";

const InputStyled = ({ ...rest }: TextInputProps) => {
  return (
    <View className="relative flex max-w-[90%] items-center justify-center leading-7">
      <View className="absolute left-4 h-5 w-5 fill-none">
        <User size={20} strokeWidth={3} color={"#042A43"} />
      </View>

      <TextInput
        className="mb-2 h-16 w-80 rounded-xl border-[1px] border-primary py-0 pl-12 text-2xl text-primary placeholder-opacity-50 outline-none transition-all"
        placeholderTextColor={"#012d4887"}
        {...rest}
      />
    </View>
  );
};

export const InputIcon = styled(InputStyled);
