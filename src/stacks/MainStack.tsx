import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/types';
import colors from '../assets/colors/colors';

// TODO: Import all screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CommunityScreen from '../screens/auth/CommunityScreen';
import MainTab from './navigation/MainTab';
import RegisterScreen from '../screens/auth/RegisterScreen';
import useAuth from '../hooks/AuthContext';
import { ActivityIndicator, Text, View } from 'react-native';
import { iYpwUserData } from '../interfaces/Interfaces';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        //statusBarStyle: isDarkMode ? 'dark' : 'light',
        //statusBarColor: isDarkMode ? colors.darker_mode : colors.lighter_mode,
      }}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
    </Stack.Navigator>
  );
};

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        //statusBarStyle: isDarkMode ? 'dark' : 'light',
        //statusBarColor: isDarkMode ? colors.darker_mode : colors.lighter_mode,
      }}>
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

const MainNavigator = (): JSX.Element => {
  const { authData, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={80} color={colors.primary_shade} />
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            fontFamily: 'Montserrat-Medium',
          }}>
          Comprobando si existe sesion...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
