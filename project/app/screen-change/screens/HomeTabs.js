import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MessageScreen from "./MessageScreen";
import FeedScreen from "./FeedScreen";
import { Ionicons } from "@expo/vector-icons"; //defaultアイコン追加

const Tab = createBottomTabNavigator(); //NavigationのTab作成

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        onPress={() =>
          navigation.navigate("MessageScreen", {
            message: 1,
          })
        }
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
