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
import { RootStackParamList } from '../../types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'> & {
  isDarkMode?: boolean | null;
};

const SplashScreen = ({ navigation, isDarkMode }: SplashProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screen}>
        <Text>Splash</Text>
        <Text>Dark Mode is on?: {isDarkMode ? 'Si' : 'No'}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>
            Ir a Login Screen
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={colors.white}
            />
          </Text>
        </TouchableOpacity>
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
  button: {
    width: 'auto',
    backgroundColor: colors.primary_six,
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
});

export default SplashScreen;
