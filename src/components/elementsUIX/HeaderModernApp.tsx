import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DashboardStackProps } from '../../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { iHeaderProps } from '../../interfaces/Interfaces';
import { useTheme } from '../../hooks/ThemeContext';
import colors from '../../assets/colors/colors';
import LoadingDots from './LoadingDots';

type HeaderAppProps = NativeStackScreenProps<
  DashboardStackProps,
  'Dashboard'
> & {
  name?: string;
  loading?: boolean;
};

const HeaderModernApp = ({
  navigation,
  route,
  name,
  loading,
}: HeaderAppProps) => {
  const { colorsTheme, isDarkMode, toggleDarkMode } = useTheme();

  const onToggleDarkMode = () => {
    toggleDarkMode(!isDarkMode);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.itemLeft}>
          <View
            style={{
              borderWidth: 2.5,
              borderRadius: 15,
              borderColor: colors.white,
            }}>
            <Image
              source={require('../../assets/images/img-default-user-icon.jpg')}
              style={styles.imgProfile}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={[styles.textName, { color: colorsTheme.text }]}>
              {name ? name : 'Nombre de usuario'}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colorsTheme.text,
              }}>
              Administrador
            </Text>
          </View>
        </View>

        <View style={styles.itemRight}>
          {/* Estado de loading */}
          {loading && <LoadingDots />}

          {/* Boton de settings */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}>
            <FontAwesome6 name="gear" size={20} color={colors.medium_shade} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    width: '100%',

    paddingHorizontal: 18,
    paddingVertical: 30,
  },
  headerContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.white,
    padding: 5,
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 13,
    //alignItems: 'center',
  },
  textName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  textPosition: {},
  imgProfile: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export default HeaderModernApp;
