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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { useTheme } from '../../hooks/ThemeContext';
import colors from '../../assets/colors/colors';
import FormLogin from '../../components/elementsUIX/FormLogin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperText, TextInput } from 'react-native-paper';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation, route }: RegisterProps) => {
  const { colorsTheme, isDarkMode } = useTheme();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [fullName, setFullName] = React.useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);

  const hasPasswordErrors = () => {
    if (password.length <= 8) {
      setErrorPassword(true);
    }
    setErrorPassword(false);
  };

  const passwordErrors = () => {
    return password.length <= 8;
  };

  const hasEmailErrors = (email: string) => {
    if (!email.includes('@')) {
      setErrorEmail(true);
    }
    setErrorEmail(false);
  };

  const hasUsernameErrors = (username: string) => {
    if (!username.includes('@') || username.length <= 5) {
      setErrorUsername(true);
    }
    setErrorUsername(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.bg_welcome_screen4} />
      </View>
    );
  }

  useEffect(() => {
    hasUsernameErrors(username);
    hasEmailErrors(email);
    hasPasswordErrors();
  }, [username, email, password]);

  return (
    <>
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
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={60}>
            <View style={styles.title}>
              <Text style={styles.titleText} numberOfLines={2}>
                Sign Up
              </Text>
              <Text numberOfLines={2} style={styles.subTitle}>
                Solid Waste Management System
              </Text>
            </View>

            {/* Boton de Login */}
            <TextInput
              label="Full name"
              value={fullName}
              mode="outlined"
              onChangeText={text => setFullName(text)}
              style={styles.textInputOut}
            />
            <HelperText
              type={errorUsername ? 'error' : 'info'}
              visible={errorEmail}>
              <MaterialCommunityIcons name="account" size={14} />
              Username no es valido.
            </HelperText>

            <TextInput
              label="Username"
              value={username}
              mode="outlined"
              onChangeText={text => setUsername(text)}
              style={styles.textInputOut}
            />
            <HelperText
              type={errorUsername ? 'error' : 'info'}
              visible={errorEmail}>
              <MaterialCommunityIcons name="account" size={14} />
              Username no es valido.
            </HelperText>

            <TextInput
              label="Email"
              value={email}
              mode="outlined"
              onChangeText={text => setEmail(text)}
              style={styles.textInputOut}
            />
            <HelperText
              type={errorEmail ? 'error' : 'info'}
              visible={errorEmail}>
              <MaterialCommunityIcons name="lock" size={14} />
              El email debe contener @.
            </HelperText>

            <TextInput
              label="Password"
              value={password}
              mode="outlined"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={styles.textInputOut}
            />
            <HelperText type="error" visible={passwordErrors()}>
              La contraseña debe tener 8 o mas caracteres.
            </HelperText>

            {/* Boton de Login */}
            <TouchableOpacity
              style={[styles.button, { marginTop: 50 }]}
              onPress={() => navigation.navigate('Community')}>
              <Text style={styles.buttonText}>REGISTRARSE</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                marginTop: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: colors.secondary_two,
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
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
    height: '100%',
    marginHorizontal: 20,
  },
  formLogin: {},
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
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 75,
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
  textInputOut: {
    fontSize: 14,
    //marginTop: 10,
    backgroundColor: colors.login_input,
  },
  textInputFlat: {
    height: 55,
    width: '100%',
    //marginBottom: 10,
    backgroundColor: colors.white,
  },
});

export default RegisterScreen;
