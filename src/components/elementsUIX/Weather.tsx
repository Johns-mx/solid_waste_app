import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { get_current_local_weather } from '../../services/WeatherService';
import {
  iLocation,
  iLocationRequest,
  iWeatherApiResponse,
} from '../../interfaces/iWeather';
import { iLocationGPS } from '../../interfaces/Interfaces';

function getDominicanRepublicTime(): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Santo_Domingo',
    hour: '2-digit',
    minute: '2-digit',
    //second: '2-digit',
    hour12: true,
  };
  return new Date().toLocaleTimeString('en-US', options);
}

interface WeatherProps {
  latitude: number | null;
  longitude: number | null;
  isError: string | null;
  isWeather: boolean;
  isLoading: boolean;
}

const Weather = ({
  latitude,
  longitude,
  isError,
  isWeather,
  isLoading,
}: WeatherProps): React.JSX.Element => {
  const [time, setTime] = useState<string>(getDominicanRepublicTime());
  const [isDay, setIsDay] = useState<number>();
  const [weather, setWeather] = useState<iWeatherApiResponse>();
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [error, setError] = useState<string | null>(isError);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const location: iLocationRequest = {
          lat: latitude,
          lng: longitude,
        };
        const data = await get_current_local_weather(location);
        setWeather(data);
        setIsDay(data?.current?.is_day); // Aquí mueve la asignación de setIsDay dentro de try
      } catch (error) {
        setError('Error fetching weather');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentWeather();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3498db"
        style={{ height: 115, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return isWeather && error ? (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white,
        elevation: 1,
      }}>
      <Text
        style={{
          margin: 10,
          marginBottom: 20,
          textAlign: 'center',
        }}>
        Weather no disponible por ahora.
      </Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          padding: 10,
          backgroundColor: colors.primary_bg_tint,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: colors.bg_welcome_screen3,
          }}>
          Volver a compartir ubicación
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <ImageBackground
      //resizeMode="stretch"
      source={
        isDay
          ? require('../../assets/images/bg_weather_day.png')
          : require('../../assets/images/bg_weather_night.png')
      }
      style={[
        styles.container,
        { backgroundColor: isDay ? colors.white : colors.dark },
      ]}>
      <View style={[styles.containerSides, styles.leftSide]}>
        {/* Lado izquierdo */}

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <MaterialIcons name="location-pin" size={20} color={colors.white} />
          <Text style={{ color: colors.white }}>
            {weather?.location?.name}, {weather?.location?.region}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 40,
            alignItems: 'center',
            fontFamily: 'Montserrat-MediumItalic',
            color: colors.white,
          }}>
          {weather?.current?.temp_c}°
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat-Italic',
            color: colors.white,
          }}>
          {weather?.current?.condition?.text}
        </Text>
      </View>

      {/* Lado derecho */}
      <View style={styles.rightSide}>
        <Image
          source={{
            uri: `https:${weather?.current?.condition?.icon}`,
          }}
          style={{ width: 100, height: 90 }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 115,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1.5,
  },
  day: {
    color: colors.dark,
  },
  night: {
    color: colors.white,
  },
  containerSides: {
    //width: '50%',
    justifyContent: 'space-between',
    //borderWidth: 1,
  },
  leftSide: {
    //width: '40%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rightSide: {
    //width: '60%',
    //flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    //right: 0,
    //alignItems: 'flex-end',
  },
  weatherWrapper: {},
  weatherIcon: {},
  weatherLocation: {},
  temperature: {},
  condition: {},
});

export default Weather;
