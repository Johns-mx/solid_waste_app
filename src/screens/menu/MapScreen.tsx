import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screen}>
        <Text>Routes Map</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MapScreen
