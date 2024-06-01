import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../assets/colors/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { iBackdropProps, iCommunity } from '../../interfaces/Interfaces';
import {
  get_all_town_halls,
  getAllTownHalls,
} from '../../services/CommunityService';
import communitiesData from '../../constants/communitiesData.json';
import useAuth from '../../hooks/AuthContext';

type CommunityProps = NativeStackScreenProps<RootStackParamList, 'Community'>;

// dimensiones
const { width, height } = Dimensions.get('window');
const ANCHO_CONTENEDOR = width * 0.7;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

const createImageList = (communities: iCommunity[]): string[] => {
  const imageList: string[] = [];
  communities.forEach(community => {
    if (community.img) {
      imageList.push(community.img);
    }
  });
  return imageList;
};

function Backdrop({ scrollX, communities }: iBackdropProps) {
  const imagenes = createImageList(communities);

  return (
    <View
      style={[
        {
          position: 'absolute',
          height: ALTURA_BACKDROP,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}>
      {imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 1) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 1) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        return (
          <Animated.Image
            key={index}
            source={{ uri: imagen }}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
      <LinearGradient
        colors={['transparent', 'transparent', colors.primary_bg]}
        style={{
          width,
          height: ALTURA_BACKDROP,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
}

const CommunityScreen = ({ navigation, route }: CommunityProps) => {
  const { colorsTheme, isDarkMode } = useTheme();
  const [communityData, setCommunityData] = useState<iCommunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { authData } = useAuth();

  const handleGoToMainTab = () => {
    navigation.navigate('MainTab');
  };

  useEffect(() => {
    // const fetchCommunities = async () => {
    //   try {
    //     const data = await getAllTownHalls();
    //     setCommunityData(data);
    //   } catch (error) {
    //     setError('Error fetching town halls');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchCommunities();
    try {
      setCommunityData(communitiesData);
    } catch (error) {
      setError('Error al obtener las comunidades.');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3498db"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        { backgroundColor: colorsTheme.background },
      ]}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <Backdrop communities={communityData} scrollX={scrollX} />

      {/* Screen: Community */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        //keyboardVerticalOffset={60}
      >
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '700',
              fontFamily: 'Montserrat-Bold',
              color: isDarkMode ? colors.black : colors.dark_mode,
            }}>
            Comunidad
          </Text>
          <Text
            style={[
              styles.subTitle,
              { color: isDarkMode ? colors.black : colors.dark_mode },
            ]}>
            Elije el ayuntamiento segun tu comunidad
          </Text>

          {/* Input de busqueda de comunidad */}
          <View style={{ alignItems: 'center', height: 40, marginBottom: 20 }}>
            <TextInput
              placeholder="Busca tu comunidad..."
              style={{
                width: '60%',
                backgroundColor: colors.white,
                paddingLeft: 15,
                borderRadius: 15,
                elevation: 3,
              }}
            />
          </View>

          <Animated.FlatList
            data={communityData}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            contentContainerStyle={styles.contentContainerStyle}
            snapToInterval={ANCHO_CONTENEDOR}
            decelerationRate={0}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ANCHO_CONTENEDOR,
                index * ANCHO_CONTENEDOR,
                (index + 1) * ANCHO_CONTENEDOR,
              ];

              const scrollY = scrollX.interpolate({
                inputRange,
                outputRange: [0, -50, 0],
              });

              return (
                <View style={{ width: ANCHO_CONTENEDOR }}>
                  <Animated.View
                    style={[
                      styles.styleAnimationView,
                      { transform: [{ translateY: scrollY }] },
                    ]}>
                    <TouchableOpacity
                      onPress={() => handleGoToMainTab()}
                      style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{ uri: item.img }}
                        style={styles.posterImage}
                      />
                      <Text
                        style={{
                          padding: 10,
                          fontWeight: 'bold',
                          fontSize: 16,
                          textAlign: 'center',
                        }}
                        numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text>{item.community}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  // asasasasa
  posterImage: {
    width: '100%',
    height: ANCHO_CONTENEDOR * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  styleAnimationView: {
    marginHorizontal: ESPACIO,
    padding: ESPACIO,
    borderRadius: 34,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingTop: 80,
    paddingHorizontal: ESPACIO_CONTENEDOR,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    bottom: 50,
    // marginTop: 25,
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
  line: {
    height: 2,
    width: '80%',
    //position: 'absolute',
    backgroundColor: colors.bg_welcome_screen3,
    bottom: 60,
  },
});

export default CommunityScreen;
