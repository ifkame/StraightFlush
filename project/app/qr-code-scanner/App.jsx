import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';

import Home from "./screens/Home";
import Scanner from "./screens/Scanner";
import Generator from "./screens/Generator";

//スタックナビゲーターのおかげで、画面間の移動ができます
const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ホーム" component={Home} />
      <Stack.Screen name="スキャナー" component={Scanner} />
      <Stack.Screen name="生成" component={Generator} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};