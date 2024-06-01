import React from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import SplashContent from '../../components/elementsUIX/SplashContent';

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation, route }: SplashProps) => {
  return (
    <ImageBackground
      style={styles.safeAreaView}
      resizeMode="cover"
      source={require('../../assets/images/bg_welcome6.jpg')}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View style={styles.screen}>
        <SplashContent navigation={navigation} route={route} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SplashScreen;
