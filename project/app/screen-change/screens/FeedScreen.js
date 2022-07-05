import React from "react";
import { View, Text, Button } from "react-native";

const FeedScreen = ({ navigation }) => {
  return (
    <View>
      <Text>フィード画面</Text>
      {/* <Button
        title="フィード"
        onPress={() =>
          navigation.navigate("MessageScreen", {
            message: 1,
          })
        }
      /> */}
    </View>
  );
};

export default FeedScreen;
