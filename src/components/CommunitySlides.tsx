import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import communitiesData from '../constants/communitiesData';
import { iCommunity } from '../interfaces/Interfaces';

const CommunitySlides = () => {
  const renderItem = ({ item }: { item: iCommunity }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
        <Text style={styles.community}>{item.community}</Text>
        {/* Agrega más información aquí si es necesario */}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={communitiesData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: '75%',
    width: 300,
    backgroundColor: '#fff',

    padding: 5,

    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,

    borderRadius: 25,
    elevation: 2,
    gap: 10,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
  },
  contentContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  community: {
    fontSize: 14,
  },
});

export default CommunitySlides;
