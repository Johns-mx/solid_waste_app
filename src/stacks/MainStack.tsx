import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/types';

// TODO: Import all screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainTab from './navigation/MainTab';
import colors from '../assets/colors/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        //statusBarStyle: isDarkMode ? 'dark' : 'light',
        //statusBarColor: isDarkMode ? colors.darker_mode : colors.lighter_mode,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

const MainNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
