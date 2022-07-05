import React from "react"; //React使用
import { NavigationContainer } from "@react-navigation/native"; //React-Ntiveコンポーネント追加
import { createDrawerNavigator } from "@react-navigation/drawer"; //画面移動(メニュー)
import MainScreen from "./screens/MainScreen"; //メイン画面処理の追加
import HomeScreen from "./screens/HomeScreen"; //ホーム画面処理の追加
import UserScreen from "./screens/UserScreen"; //ユーザー画面処理の追加
import "react-native-gesture-handler"; //
import { useWindowDimensions } from "react-native"; //アプリケーションウィンドウの幅と高さを取得

const Drawer = createDrawerNavigator(); //Navigationのメニュー作成

const App = () => {
  const dimensions = useWindowDimensions(); //画面サイズを自動取得
  return (
    <NavigationContainer>
      <Drawer.Navigator
        // initialRouteName="Main" //最初のメニューを指定
        screenOptions={{
          //drawerType：画面サイズに基づいて動作
          drawerType: dimensions.width >= 768 ? "permanent" : "front",
        }}
      >
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="User" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
