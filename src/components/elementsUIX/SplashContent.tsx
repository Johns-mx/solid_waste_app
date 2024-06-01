import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import { RootStackParamList } from '../../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashContent = ({ navigation }: SplashProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText} numberOfLines={2}>
          Unforgetting Experiences
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          Discover efficense and professionalism
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    position: 'absolute',
    bottom: 50,
    backgroundColor: colors.bg_welcome_screen1,
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    marginTop: 125,
    gap: 10,
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.bg_welcome_screen3,
    textAlign: 'center',
  },
  subTitle: {
    color: colors.bg_welcome_screen5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default SplashContent;
