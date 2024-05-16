import {
  SafeAreaView,
  ScrollView,
  StatusBar,
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
import HeaderApp from '../../components/elementsUIX/HeaderApp';
import LinearGradient from 'react-native-linear-gradient';

type DashboardProps = NativeStackScreenProps<DashboardStackProps, 'Dashboard'>;

const DashboardScreen = ({ navigation, route }: DashboardProps) => {
  const { colorsTheme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colorsTheme.background}
      />

      <LinearGradient
        colors={
          isDarkMode
            ? [colors.primary_seven, colors.primary_shade, colors.white]
            : [colors.primary_bg, colors.primary_bg, colors.white]
        }
        style={styles.linearGradient}>
        {/* Screen: ScrollView */}

        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <HeaderApp
              navigation={navigation}
              route={route}
              name="John P. Sanchez"
            />
          </View>

          {/* Screen: ScrollView */}
          <View style={styles.screen}>
            <View style={{ marginBottom: 10, marginLeft: 10 }}>
              <Text
                style={{
                  color: colorsTheme.text,
                  fontSize: 19,
                  fontFamily: 'Roboto-Regular',
                }}>
                Welcome Back {'\n'}John P. Sanchez
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                height: 150,
                backgroundColor: colors.white,
                borderRadius: 20,
                elevation: 1.5,
              }}></View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorsTheme.button }]}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={[styles.buttonText]}>Ir al Profile</Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorsTheme.button }]}
              onPress={() => navigation.navigate('Logout')}>
              <Text style={[styles.buttonText]}>Ir al Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    marginHorizontal: 15,
  },
  header: {
    marginBottom: 10,
  },
  button: {
    width: 'auto',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Linear gradiente
  linearGradient: {
    flex: 1,
  },
});

export default DashboardScreen;
