import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardStackProps } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';

type LogoutProps = NativeStackScreenProps<DashboardStackProps, 'Logout'>;

const LogoutScreen = ({ navigation, route }: LogoutProps) => {
  const { colorsTheme, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { backgroundColor: colorsTheme.background },
      ]}>
      <View style={styles.screen}>
        <Text style={{ color: colorsTheme.text }}>Logout</Text>
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

export default LogoutScreen;
