import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardStackProps } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';
import colors from '../../assets/colors/colors';
import useAuth from '../../hooks/AuthContext';

type ProfileProps = NativeStackScreenProps<DashboardStackProps, 'Profile'>;

const ProfileScreen = ({ navigation, route }: ProfileProps) => {
  const { colorsTheme, isDarkMode } = useTheme();
  const authentication = useAuth();

  const signOutHandler = async () => {
    try {
      await authentication.signOut();
    } catch (err) {
      Alert.alert('Error', 'Could not sign out');
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { backgroundColor: colorsTheme.background },
      ]}>
      <View style={styles.screen}>
        <TouchableOpacity onPress={signOutHandler} style={styles.button}>
          <Text style={styles.buttonText}>CERRAR SESION</Text>
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
    marginHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.bg_welcome_screen3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
