import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../../types/types';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import all screens of menu
import DashboardStack from './DashboardStack';
import HistoryScreen from '../../screens/menu/HistoryScreen';
import MapScreen from '../../screens/menu/MapScreen';
import colors from '../../assets/colors/colors';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardStack"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.bg_welcome_screen3,
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          elevation: 2,
          height: 60,
          backgroundColor: colors.white,
          borderRadius: 10,
        },
        headerTransparent: false,
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: colors.primary_shade,
          height: 50,
        },
      }}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          headerShown: false,
          title: 'DASHBOARD',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          title: 'MAPA DE RUTAS',
          tabBarLabel: 'Routes Map',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  top: Platform.OS == 'ios' ? -10 : -20,
                  width: Platform.OS == 'ios' ? 50 : 60,
                  height: Platform.OS == 'ios' ? 50 : 60,
                  borderRadius: Platform.OS == 'ios' ? 25 : 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.white,
                  elevation: 3,
                }}>
                <MaterialCommIcon
                  name={
                    focused ? 'map-marker-radius' : 'map-marker-radius-outline'
                  }
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: true,
          title: 'HISTORIAL',
          tabBarLabel: 'Historial',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommIcon
              name={focused ? 'history' : 'history'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
