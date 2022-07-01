import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const UserScreen = () => {
  /* useEffect
    関数コンポーネントの出力(レンダリング)に関係ない処理を行うことができる
  */
  useEffect(() => {
    //画面反映時
    //console.log("User Mount");
    return () => {
      //画面離脱時
      //console.log("User Unmount");
    };
  }, []);

  /* useFocusEffect
    画面に移動したときの処理を行うことができる
  */
  useFocusEffect(
    React.useCallback(() => {
      //画面移動時(表示)
      console.log("User Focus");
      return () => {
        ////画面移動時(離脱)
        console.log("User UnFocus");
      };
    }, [])
  );

  return (
    <View>
      <Text>ユーザ画面</Text>
    </View>
  );
};

export default UserScreen; //import時の名称設定: UserScreen
