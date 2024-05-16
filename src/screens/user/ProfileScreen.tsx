import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DashboardStackProps } from '../../types/types'

type ProfileProps = NativeStackScreenProps<DashboardStackProps, 'Profile'>

const ProfileScreen = ({ navigation }: ProfileProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screen}>
        <Text>Profile</Text>
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

export default ProfileScreen
