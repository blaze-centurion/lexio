import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabIcon = ({
  icon,
  name,
  color,
  focused,
  className
}: {
  icon: any;
  name: string;
  color: string;
  focused: boolean;
  className?: string
}) => {
  return (
    <View className="items-center flex-1 justify-center gap-2 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={className || "w-6 h-6"}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs w-full `}
        textBreakStrategy="simple"
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor:"#CDCDE0",
          tabBarActiveTintColor:"#FF6B6B",
          tabBarStyle: {
            height: 55,
            paddingTop: 15,
            elevation:0,
            // borderTopWidth: 0
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.home}
                name="Home"
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wod"
          options={{
            title: "Word of Day",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.wod}
                name="Word of Day"
                focused={focused}
                color={color}
                className="w-7 h-7"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                icon={icons.profile}
                name="Profile"
                focused={focused}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
