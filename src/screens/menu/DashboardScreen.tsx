import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import colors from '../../assets/colors/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DashboardStackProps } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Weather from '../../components/elementsUIX/Weather';
import HeaderModernApp from '../../components/elementsUIX/HeaderModernApp';
import { iLocationGPS, iYpwUserData } from '../../interfaces/Interfaces';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Button, Portal, Switch } from 'react-native-paper';
import { AuthService, UserService } from '../../services/UsersService';
import { Comment, Opinion } from '../../components/elementsUIX/Comment';
import useAuth from '../../hooks/AuthContext';

type DashboardProps = NativeStackScreenProps<DashboardStackProps, 'Dashboard'>;

const DashboardScreen = ({ navigation, route }: DashboardProps) => {
  const { colorsTheme, isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState<number | null>(0);
  const [longitude, setLongitude] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isWeatherActive, setWeatherActive] = useState<boolean>(false);
  const [user, setUser] = useState<iYpwUserData | null>();
  const { userData } = useAuth();

  const onToggleWeather = async () => {
    setLoading(true);
    setWeatherActive(!isWeatherActive);
    console.log('Recargando desde el onToggleWeather');
    setLoading(false);
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(latitude, longitude);
        setLoading(false);
      },
      error => {
        Alert.alert('Error al obtener la ubicación', error.message);
        setLoading(false);
        setError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    setUser(userData);
    const requestLocationPermission = async () => {
      // No solicitar permisos si isWeatherActive es false
      if (!isWeatherActive) {
        setLoading(false);
        return;
      }

      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permiso de Localización',
              message: 'Esta aplicación necesita acceso a tu ubicación',
              buttonNeutral: 'Preguntar después',
              buttonNegative: 'Cancelar',
              buttonPositive: 'Aceptar',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await getLocation();
            setError(null);
          } else {
            Alert.alert('Permiso de localización denegado');
            setLoading(false);
            setError('La app no tiene permiso de localización.');
          }
        } catch (err) {
          console.warn(err);
          setLoading(false);
          setError('La app no tiene permiso de localización.');
        }
      } else {
        // TODO: Preguntar para IOS.
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          await getLocation();
          setError(null);
        } else {
          Alert.alert('Permiso de localización denegado');
          setLoading(false);
          setError('La app no tiene permiso de localización.');
        }
      }
    };

    setUser(userData);
    requestLocationPermission();
    console.log('Recargando desde el useEffect');
  }, []);

  const onRefresh = useCallback(async () => {
    // Aquí pones la lógica para recargar los datos.
    setRefreshing(true);
    setUser(userData);
    if (isWeatherActive) await getLocation();
    console.log('Recargando desde el refresh');
    setLoading(false);
    setError(null);

    // Simulando una recarga de datos con un timeout de 2 segundos.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(show => !show);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colorsTheme.statusBar}
      />

      <LinearGradient
        colors={
          isDarkMode
            ? [colors.dark_shade, colors.dark_shade, colors.dark_shade]
            : [colors.primary_bg, colors.primary_bg, colors.white]
        }
        style={styles.linearGradient}>
        {/* Screen: ScrollView */}

        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{ flex: 1, height: '100%' }}
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Header */}
          <View style={styles.header}>
            <HeaderModernApp
              navigation={navigation}
              route={route}
              name={user?.name}
              loading={refreshing || loading}
            />
          </View>

          {/* Screen: ScrollView */}
          <View style={styles.screen}>
            <View
              style={{
                marginTop: 10,
                marginBottom: 40,
                marginLeft: 5,
                opacity: 0.8,
              }}>
              <Text
                style={{
                  color: colorsTheme.button,
                  fontSize: 28,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Hi, Johanel
              </Text>
              <Text>Good Morning</Text>
            </View>

            {/* Activacion del weather: Switch */}
            <Switch value={isWeatherActive} onValueChange={onToggleWeather} />

            {/* Activacion del weather: si isWeatherActive */}
            {isWeatherActive ? (
              <Weather
                latitude={latitude}
                longitude={longitude}
                isError={error}
                isWeather={isWeatherActive}
                isLoading={loading}
              />
            ) : (
              <View></View>
            )}

            {/* Componente: Comentarios */}
            <Portal>
              <Opinion showModal={showModal} />
            </Portal>

            {/* Logout */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colorsTheme.button }]}
              onPress={() => navigation.navigate('Logout')}>
              <Text style={styles.buttonText}>Ir al Logout</Text>
            </TouchableOpacity>

            <Button
              style={{ marginTop: 30 }}
              mode="contained"
              onPress={toggleModal}>
              Redactar
            </Button>
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
    height: '100%',
  },
  screen: {
    flex: 1,
    height: '100%',
    marginHorizontal: 15,
  },
  header: {
    marginTop: 0,
    marginBottom: 10,
    // backgroundColor: colors.bg_welcome_screen3,
    //marginHorizontal: 5,
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
    height: '100%',
  },
});

export default DashboardScreen;
