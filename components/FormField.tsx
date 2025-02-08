import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  titleStyle?:string;
  keyboardType?: KeyboardTypeOptions;
}
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  titleStyle,
  keyboardType="default",
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={cn("space-y-2", otherStyles)}>
      <Text className={cn("text-base text-secondary-black font-pmedium mb-2", titleStyle)}>
        {title}
      </Text>
      <View className="w-full h-16 px-4 flex-row items-center bg-slate-100 rounded-xl focus:border-secondary border-2 border-transparent ">
        <TextInput
          className="flex-1 tex-black font-psemibold text-base"
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title=="Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title=="Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                resizeMode="contain"
                className="w-7 h-7"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
