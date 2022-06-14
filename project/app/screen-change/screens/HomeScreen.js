import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  /* useEffect
    関数コンポーネントの出力(レンダリング)に関係ない処理を行うことができる
  */
  useEffect(() => {
    //画面反映時
    //console.log("Home Mount");
    return () => {
      //画面反映解除時
      //console.log("Home Unmount");
    };
  }, []);

  /* useFocusEffect
    画面に移動したときの処理を行うことができる
  */
  useFocusEffect(
    React.useCallback(() => {
      //画面移動時(表示)
      console.log("Home Focus");
      return () => {
        ////画面移動時(離脱)
        console.log("Home UnFocus");
      };
    }, [])
  );

  return (
    <View>
      <Text>ホーム画面</Text>
      <Button
        title="ユーザ"
        onPress={() =>
          navigation.navigate("User", {
            userId: 1 /* ユーザーIDを「ユーザー画面」に値渡し */,
          })
        }
      />
    </View>
  );
};

export default HomeScreen; //import時の名称設定: HomeScreen
