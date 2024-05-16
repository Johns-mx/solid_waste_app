/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainNavigator from './src/stacks/MainStack';
import colors from './src/assets/colors/colors';
import { ThemeProvider, useTheme } from './src/hooks/ThemeContext';

function App(): React.JSX.Element {
  const { isDarkMode, colorsTheme } = useTheme();

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colorsTheme.background}
        />
        <MainNavigator />
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
