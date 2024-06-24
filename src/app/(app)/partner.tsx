import { View, Text, Pressable, ScrollView } from "react-native";

import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { styles } from "@/utils/styles";

export default function PartnerScreen() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <View className="flex flex-1 items-center pt-4">
      <Pressable
        className="flex h-10 w-5/6 flex-row items-center justify-between rounded-xl bg-white px-4"
        style={styles.shadow}
        onPress={toggleOpen}
      >
        <Text className="text-xl text-black">Selecione a cidade</Text>
        {open ? (
          <ChevronUp size={25} className="text-black" />
        ) : (
          <ChevronDown size={25} className="text-black" />
        )}
      </Pressable>

      {open && (
        <View className="relative z-50 flex h-auto w-[90%] items-center justify-center">
          <ScrollView
            className="absolute top-5 z-50 flex w-full min-w-[8rem] gap-3 rounded-xl bg-white p-3"
            style={styles.shadow_sm}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} className="h-10 w-[90%]" style={styles.shadow}>
                <Button
                  variant="outline"
                  shadow={true}
                  className="h-10 w-full items-start rounded-lg px-4 font-normal"
                >
                  Formosa - Goiás
                </Button>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <View className="flex h-32 w-full items-center justify-center bg-lime-500">
        <Text>Teste2</Text>
      </View>

      {/* <DropDown open={open} setOpen={setOpen}>
        <DropDownContent>
          <DropDownLabel labelTitle="My Account" />
          <DropDownItemSeparator />
          <DropDownItem>
            <TouchableOpacity className="flex flex-row items-center gap-2">
              <CircleUser size={18} color="#fff" />
              <Text className="text-xl text-primary">Profile</Text>
            </TouchableOpacity>
          </DropDownItem>
          <DropDownItem>
            <TouchableOpacity className="flex flex-row items-center gap-2">
              <Settings size={18} color="#fff" />
              <Text className="text-xl text-primary">Settings</Text>
            </TouchableOpacity>
          </DropDownItem>
          <DropDownItem>
            <TouchableOpacity className="flex flex-row items-center gap-2">
              <CreditCard size={18} color="#fff" />
              <Text className="text-xl text-primary">Billing</Text>
            </TouchableOpacity>
          </DropDownItem>
          <DropDownLabel labelTitle="Team" />
          <DropDownItemSeparator />
          <DropDownItem>
            <TouchableOpacity className="flex flex-row items-center gap-2">
              <CreditCard size={18} color="#fff" />
              <Text className="text-xl text-primary">Billing</Text>
            </TouchableOpacity>
          </DropDownItem>
        </DropDownContent>
      </DropDown> */}
    </View>
  );
}
