import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Pressable, Image, LogBox } from 'react-native'
import { ViewPropTypes } from 'deprecated-react-native-prop-types'
import { store } from './store/store'
import { Provider } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Colors from './constants/colors'

import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Resigner from './screens/Resigner'
import Maps from './screens/Maps'
import Information from './screens/Information'
import Mission from './screens/Mission'
import MyPage from './screens/MyPage'
import ResignerPage1 from './screens/ResignerPage1'
import ResignerPage2 from './screens/ResignerPage2'
import ResignerPage3 from './screens/ResignerPage3'
import ResignerGroup1 from './screens/ResignerGroup/ResignerGroup1'
import ResignerGroup2 from './screens/ResignerGroup/ResignerGroup2'
import ResignerGroup3 from './screens/ResignerGroup/ResignerGroup3'
import QR from './screens/QR'
import Stamp from './screens/Stamp'
import Profile from './screens/Profile'
import Setting from './screens/Setting'
import Shop from './screens/Shop'
import StampDetails from './screens/StampDetails'

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."])

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const MyPageStack = createNativeStackNavigator()

const StampStack = createNativeStackNavigator()

const StampScreen = () => {
  return (
    <StampStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary2,
        },
      }}
    >
      <StampStack.Screen
        name='Stamp'
        component={Stamp}
        options={{ title: 'スタンプ', headerTintColor: '#fff' }}
      />
      <StampStack.Screen
        name='StampDetails'
        component={StampDetails}
        options={{ title: 'スタンプ帳', headerTintColor: '#fff' }}
      />
    </StampStack.Navigator>
  )
}

function MyPageScreen() {
  return (
    <MyPageStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary2,
        },
      }}
    >
      <MyPageStack.Screen
        name='MyPage'
        component={MyPage}
        options={{
          title: 'マイページ',
          headerTintColor: '#fff',
          headerRight: () => {
            return (
              <Pressable onPress={() => {}} style={{ marginRight: 15 }}>
                <Image source={require('./assets/window.png')}></Image>
              </Pressable>
            )
          },
        }}
      />

      <MyPageStack.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'プロフィール編集',
          headerTintColor: '#fff',
        }}
      />
      <MyPageStack.Screen
        name='Setting'
        component={Setting}
        options={{
          title: 'アプリ設定',
          headerTintColor: '#fff',
        }}
      />
      <MyPageStack.Screen
        name='Shop'
        component={Shop}
        options={{
          title: 'お気に入り店舗',
          headerTintColor: '#fff',
        }}
      />
    </MyPageStack.Navigator>
  )
}
const MapsNavigation = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors.primary2,
        },
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
            <FontAwesome name='bell' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='StampScreen'
        component={StampScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'スタンプ',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name='stamp' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='Event'
        component={Mission}
        options={{
          title: 'ミッション',
          tabBarLabel: 'ミッション',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar' size={24} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='MyPageScreen'
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'マイページ',

          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person' size={24} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='StartScreen'
              component={StartScreen}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: Colors.primary2,
                },
              }}
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
              options={{ title: 'Step 3' }}
            />
            <Stack.Screen
              name='ResignerGroup1'
              component={ResignerGroup1}
              options={{ title: 'Step 1' }}
            />
            <Stack.Screen
              name='ResignerGroup2'
              component={ResignerGroup2}
              options={{ title: 'Step 2' }}
            />
            <Stack.Screen
              name='ResignerGroup3'
              component={ResignerGroup3}
              options={{ title: 'Step 3' }}
            />
            <Stack.Screen name='QR' component={QR} options={{ title: 'QR' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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
