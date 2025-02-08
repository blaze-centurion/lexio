import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit = async () => {
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.name);
      setUser(result)
      setIsLoggedIn(true)
      
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 min-h-[90vh] my-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[40px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold mt-10">
            Sign Up in Lexio.
          </Text>
          <FormField
            title="Name"
            value={form.name}
            placeholder="Enter your name"
            handleChangeText={(e: string) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyle="mt-7"
          />

          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-secondary-black font-pregular text-md">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-primary-black font-psemibold"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
