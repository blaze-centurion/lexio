import { View, Text } from "react-native";
import React from "react";

const VocabCard = ({
  data: { word, meaning, sentence, $updatedAt },
}: {
  data: any;
}) => {
  return (
    <View className="w-full min-h-[100px] py-4 px-5 bg-slate-100 rounded-lg">
      <Text className="font-psemibold text-lg text-primary-black">{word}</Text>
      <Text className="font-pregular text-md text-secondary-black">
        {meaning}
      </Text>
      <Text className="font-pmedium mt-1 text-secondary-black text-sm">
        {$updatedAt.split("T")[0].split("-").reverse().join("-")}
      </Text>
    </View>
  );
};

export default VocabCard;
