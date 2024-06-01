/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import MainNavigator from './src/stacks/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/hooks/ThemeContext';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthProvider';
import colors from './src/assets/colors/colors';

function App() {
  const { isDarkMode, colorsTheme } = useTheme();

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <PaperProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colorsTheme.background}
          />
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
