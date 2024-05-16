import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { DashboardStackProps } from '../../types/types'

// Import all screens
import DashboardScreen from '../../screens/menu/DashboardScreen'
import ProfileScreen from '../../screens/user/ProfileScreen'
import LogoutScreen from '../../screens/user/LogoutScreen'

const Stack = createNativeStackNavigator<DashboardStackProps>()

const DashboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
