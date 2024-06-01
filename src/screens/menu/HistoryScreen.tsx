import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import { useTheme } from '../../hooks/ThemeContext';

const HistoryScreen = () => {
  const { colorsTheme, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { backgroundColor: colorsTheme.background },
      ]}>
      {/* <StatusBar backgroundColor={colors.primary_shade} /> */}
      <View style={styles.screen}>
        <Text style={{ color: colorsTheme.text }}>History</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
