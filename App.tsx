import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import TimerScreen from './screens/TimerScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignUpScreen from './screens/SignUpScreen';
import PasswordScreen from './screens/PasswordScreen';
import SuggestScreen from './screens/SuggestScreen';
import Favorites from './screens/Favorites';
import PetsScreen from './screens/PetsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Görevlerim') {
            iconName = 'checkmark-done-outline';
          } else if (route.name === 'Notlar') {
            iconName = 'book-outline';
          } else if (route.name === 'Zamanlayıcı') {
            iconName = 'timer-outline';
          } else if (route.name === 'Profil') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        tabBarStyle: {
          paddingVertical: 5,
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
        },
        keyboardHidesTabBar: true,
      })}
    >
      <Tab.Screen name="Görevlerim" component={HomeScreen} />
      <Tab.Screen name="Notlar" component={AddNoteScreen} />
      <Tab.Screen name="Zamanlayıcı" component={TimerScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={TabNavigator} />
          <Stack.Screen name="Ayarlar" component={SettingsScreen} />
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen name="Suggest" component={SuggestScreen} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Hayvanlarım" component={PetsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}