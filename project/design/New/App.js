import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Colors from './constants/colors'

import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Resigner from './screens/Resigner'
import Maps from './screens/Maps'
import Information from './screens/Information'
import Event from './screens/Event'
import MyPage from './screens/MyPage'
import ResignerPage1 from './screens/ResignerPage1'
import ResignerPage2 from './screens/ResignerPage2'
import ResignerPage3 from './screens/ResignerPage3'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const MapsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <BottomTabs.Screen
        name='Maps'
        component={Maps}
        options={{
          title: 'マップ',
          tabBarLabel: 'マップ',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='location-sharp' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='Information'
        component={Information}
        options={{
          title: '通知',
          tabBarLabel: '通知',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='bell-o' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='Event'
        component={Event}
        options={{
          title: 'イベント',
          tabBarLabel: 'イベント',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar-outline' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='MyPage'
        component={MyPage}
        options={{
          title: 'マイベージ',
          tabBarLabel: 'マイベージ',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person-outline' size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='StartScreen'
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Resigner'
            component={Resigner}
            options={{ title: '新規登録' }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ title: 'ログイン' }}
          />
          <Stack.Screen
            name='MapsNavigation'
            component={MapsNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='ResignerPage1'
            component={ResignerPage1}
            options={{ title: 'Step 1' }}
          />
          <Stack.Screen
            name='ResignerPage2'
            component={ResignerPage2}
            options={{ title: 'Step 2' }}
          />
          <Stack.Screen
            name='ResignerPage3'
            component={ResignerPage3}
            options={{ title: '完了' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
