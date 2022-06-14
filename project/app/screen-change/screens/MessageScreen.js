import React from "react";
import { View, Text } from "react-native";

const MessageScreen = ({ route }) => {
  return (
    <View>
      <Text>メッセージ画面{route.params.message}</Text>
    </View>
  );
};

export default MessageScreen;
