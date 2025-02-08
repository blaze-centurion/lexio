import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import { icons } from "@/constants";

interface CustomButtonProps {
  containerStyle?: string;
  title: string;
  handlePress: () => void;
  textStyle?: string;
  isLoading?: boolean;
  icon?: any;
}

const CustomButton = ({
  containerStyle,
  title,
  handlePress,
  textStyle,
  isLoading,
  icon,
}: CustomButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        className={cn(
          `bg-primary rounded-xl min-h-[55px] justify-center items-center flex-row gap-2`,
          containerStyle,
          {
            "opacity-50": isLoading,
          }
        )}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        {icon && (
          <Image
            source={icon}
            resizeMode="contain"
            className="w-6 h-6 items-center"
          />
        )}
        <Text
          className={cn(`text-white text-lg font-psemibold`, textStyle, {
            "pt-1": icon,
          })}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
