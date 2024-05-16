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

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: LoginProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screen}>
        <Text>Login</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Ir a Registro</Text>
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

export default LoginScreen;
