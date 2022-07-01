import React from "react";
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //画面移動(画面コンポーネント)-Native.ver
//import { createStackNavigator } from "@react-navigation/stack"; //画面移動(画面コンポーネント)
import HomeTabs from "./HomeTabs"; //ホームタブ処理の追加
import UserScreen from "./UserScreen"; //ユーザー画面処理の追加

const Stack = createNativeStackNavigator(); //NavigationのNative-Stack作成
//const Stack = createStackNavigator(); //NavigationのStack作成

function MainScreen() {
  return (
    /* 画面コンポーネントによる画面移動 */
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen} /* 対応画面(ユーザー画面) */
        //   options={({ route }) => ({
        //     title: `ユーザID${route.params.userId}の画面` /* ヘッダー内容 */,
        //     // headerShown: false /* ヘッダーの表示・非表示 */,
        //   })}
      />
    </Stack.Navigator>
  );
}

export default MainScreen;
