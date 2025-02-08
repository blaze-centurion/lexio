import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  const pathname = usePathname();

  return (
    <View className="w-full h-16 px-4 flex-row items-center bg-slate-100 rounded-xl focus:border-secondary border-2 border-transparent space-x-4">
      <TextInput
        className="text-base mt-0.5 font-pregular flex-1"
        placeholder="Search..."
        value={query}
        placeholderTextColor="#7b7b8b"
        onChangeText={setQuery}
      />
      {/* <TouchableOpacity
        onPress={() => {
          if (!query) return;

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
      </TouchableOpacity> */}
        <Image
          source={icons.search}
          resizeMode="contain"
          tintColor="#575758"
          className="w-5 h-5"
        />
    </View>
  );
};

export default SearchInput;
