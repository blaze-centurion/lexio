import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full w-full justify-center items-center">
        <ActivityIndicator size="large" color={"#FF6B6B"} />
      </SafeAreaView>
    );
  }

  if (!isLoading || isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 10,
        }}
      >
        <View className="w-full justify-center items-center px-4 h-full">
          <Image
            source={images.logo}
            className="w-[130px] h-[40px]"
            resizeMode="contain"
          />

          <Image
            source={images.onboard}
            className="max-w-[300px] w-full h-[360px] mt-7 mb-3"
            resizeMode="contain"
          />

          <View className="mt-5">
            <Text className="text-primary-black text-3xl text-center font-psemibold">
              Redefine How You Learn Words with{" "}
              <Text className="text-secondary">Lexio</Text>
            </Text>
            <Text className="text-secondary-black font-pregular text-center">
              Select, snap, and save—your personal vocabulary vault, always
              within reach.
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => {
                router.push("/sign-up");
              }}
              containerStyle="w-full mt-7"
            />
            <CustomButton
              title="Continue with Google"
              handlePress={() => {
                console.log("clicked");
              }}
              containerStyle="w-full mt-2 bg-white border-2 border-primary"
              textStyle="text-black"
              icon={icons.google}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
