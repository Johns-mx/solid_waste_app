import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';
import colors from '../../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperText, TextInput } from 'react-native-paper';
import { iAuthSignIn, iYpwUserData } from '../../interfaces/Interfaces';
import { AuthService, UserService } from '../../services/UsersService';
import useAuth from '../../hooks/AuthContext';
import LoadingDots from '../../components/elementsUIX/LoadingDots';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: LoginProps) => {
  const { colorsTheme, isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const authentication = useAuth();

  const signInAuth = async () => {
    setLoading(true);
    const currentUser: iAuthSignIn = {
      username_or_email: username,
      password: password,
    };

    try {
      await authentication.signIn(currentUser);
    } catch (e) {
      Alert.alert(
        'Error al iniciar sesión:',
        'Por favor, revise sus credenciales y vuelva a intentarlo.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (authentication.loadingGetUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary_shade} />
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            fontFamily: 'Montserrat-Medium',
          }}>
          Obteniendo datos del usuario...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeAreaView, { backgroundColor: colors.white }]}>
      <StatusBar
        translucent={false}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={60}
          // contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"> */}
          <View style={styles.title}>
            <Text style={styles.titleText} numberOfLines={2}>
              Sign In
            </Text>
            <Text numberOfLines={2} style={styles.subTitle}>
              Solid Waste Management System
            </Text>
          </View>

          {/* Formulario Login */}
          <TextInput
            label="Username or email"
            value={username}
            mode="outlined"
            onChangeText={text => setUsername(text)}
            style={styles.textInputOut}
          />

          <TextInput
            label="Password"
            value={password}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="eye"
                size={18}
                color={colors.bg_welcome_screen4}
              />
            }
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            style={styles.textInputOut}
          />

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => Linking.openURL('https://google.com')}>
            <Text>Olvidaste la contraseña?</Text>
          </TouchableOpacity>

          {/* Boton de Login */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: loading
                  ? colors.login_input
                  : colors.bg_welcome_screen3,
              },
            ]}
            disabled={loading}
            onPress={signInAuth}>
            <Text
              style={[
                styles.buttonText,
                { color: loading ? colors.primary_nine : colors.white },
              ]}>
              {loading ? (
                <LoadingDots color={colors.primary_nine} />
              ) : (
                'INICIAR SESIÓN'
              )}
            </Text>
          </TouchableOpacity>

          {/* Texto */}
          <Text style={{ marginVertical: 25, textAlign: 'center' }}>
            Or sign in with ...
          </Text>

          {/* Boton de Registro */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: 20,
            }}>
            <TouchableOpacity
              style={styles.buttonSocialLogin}
              onPress={() => navigation.navigate('Community')}>
              <Image
                style={{ width: 30, height: 30, borderRadius: 15 }}
                source={require('../../assets/images/google_512x512.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSocialLogin}
              onPress={() => navigation.navigate('Community')}>
              <Image
                style={{ width: 30, height: 30, borderRadius: 15 }}
                source={require('../../assets/images/facebook_512x512.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              marginTop: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: colors.secondary_two,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  screen: {
    flex: 1,
    marginHorizontal: 15,
  },
  keyboard: {
    flex: 1,
    // height: '100%',
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  formLogin: {},
  textInputOut: {
    fontSize: 14,
    marginTop: 10,
    backgroundColor: colors.login_input,
  },
  textInputFlat: {
    height: 55,
    width: '100%',
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  buttonSocialLogin: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.light_shade,
  },
  button: {
    width: '100%',
    height: 50,
    marginTop: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    //color: colors.white,
    fontFamily: 'Montserrat-Bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    gap: 10,
  },
  titleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.bg_welcome_screen3,
    textAlign: 'center',
  },
  subTitle: {
    color: colors.bg_welcome_screen5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
