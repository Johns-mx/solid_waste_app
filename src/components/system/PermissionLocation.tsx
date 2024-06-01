import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface iLocationGPS {
  latitude?: number | null;
  longitude?: number | null;
}

const PermissionLocation = () => {
  const [location, setLocation] = useState<iLocationGPS>();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
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
        getLocation();
      } else {
        Alert.alert('Permiso de localización denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        Alert.alert('Error al obtener la ubicación', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return location;
};

export default PermissionLocation;
