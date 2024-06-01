import { iCommunities, iCommunity } from '../interfaces/Interfaces'; // Asegúrate de importar la interfaz correcta

export const getCommunities = async (): Promise<iCommunities[]> => {
  try {
    // Supongamos que tienes un archivo JSON local llamado communitiesData.json que contiene la información de las comunidades
    const response = await fetch('./communitiesData.json');
    const communitiesData: iCommunity[] = await response.json();

    // Mapeamos los datos de las comunidades para que coincidan con la estructura de iCommunity
    const communities = communitiesData.map(
      ({
        id,
        title,
        description,
        community,
        location,
        contacts,
        email,
        is_active,
        is_available,
        created_at,
        updated_at,
        town_id,
        img,
      }) => ({
        id: String(id),
        title,
        description,
        community,
        location,
        contacts,
        email,
        is_active,
        is_available,
        created_at,
        updated_at,
        town_id,
        img,
      })
    );

    return communities;
  } catch (error) {
    console.error('Error al obtener las comunidades:', error);
    return [];
  }
};

// Este es el sin resalte
{
  /*
import React, { useRef, useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import communities from '../constants/communities';
import { iCommunity } from '../interfaces/Interfaces';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const CommunityAnimatedSlides = () => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<iCommunity[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setData(communities);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        //snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.img) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [25, -25, 25],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 1,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 25,
                  transform: [{ translateY }],
                }}>
                <Image source={{ uri: item.img }} style={styles.posterImage} />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default CommunityAnimatedSlides;


*/
}
