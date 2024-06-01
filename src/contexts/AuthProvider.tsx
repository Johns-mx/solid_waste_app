import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserService, AuthService } from '../services/UsersService';
import { AuthContextData, AuthData } from '../types/types';
import { iAuthSignIn, iYpwUserData } from '../interfaces/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// >>>>>>
interface iAuthContextProps {
  children: React.ReactNode;
}

// >>>>>>
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: iAuthContextProps) => {
  const [authData, setAuthData] = useState<string>();
  const [userData, setUserData] = useState<iYpwUserData>();
  const [loadingGetUser, setLoadingGetUser] = useState<boolean>(false);

  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@SWMS_TOKEN');
      const userDataSerialized = await AsyncStorage.getItem('@SWMS_USER');

      if (authDataSerialized) {
        setAuthData(authDataSerialized);

        if (userDataSerialized) {
          // If user data exists in storage, parse and set it
          const currentUserData: iYpwUserData = JSON.parse(userDataSerialized);
          setUserData(currentUserData);
        } else {
          // If user data does not exist in storage, fetch it from the service
          const userInfo = await UserService.ypwGetUser(authDataSerialized);
          await AsyncStorage.setItem('@SWMS_USER', JSON.stringify(userInfo));
          setUserData(userInfo);
        }

        console.log('Cargando sesión:', authDataSerialized);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al cargar la sesion guardada.');
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (user: iAuthSignIn) => {
    const _authData = await UserService.ypwSignIn(user);
    // const _authData = await AuthService.signIn(user);

    //and send the user to the AuthStack:
    //const auth_data: AuthData = { user_token: _authData.keyUser };
    await AsyncStorage.setItem('@SWMS_TOKEN', _authData.keyUser);
    setAuthData(_authData.keyUser);

    setLoadingGetUser(true);

    const userInfo = await UserService.ypwGetUser(_authData.keyUser);
    await AsyncStorage.setItem('@SWMS_USER', JSON.stringify(userInfo));
    setUserData(userInfo);

    setLoadingGetUser(false);
  };

  const signOut = async () => {
    try {
      const _authData = await AsyncStorage.getItem('@SWMS_TOKEN');
      if (_authData) {
        //const user_token = JSON.parse(_authData);
        await UserService.ypwSignOut(_authData);
        console.log('Se eliminó:', _authData);

        await AsyncStorage.removeItem('@SWMS_TOKEN');
        await AsyncStorage.removeItem('@SWMS_USER');
        setAuthData(undefined);
        setUserData(undefined);
      }
    } catch (err) {
      throw new Error('No se encontro la session guardada.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ authData, userData, loadingGetUser, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
