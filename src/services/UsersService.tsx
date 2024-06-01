// services/townHallService.ts
import axios from 'axios';
import {
  iAuthApiResponse,
  iAuthSignIn,
  iAuthResponse,
  iAuthSignUp,
  iYpwUserData,
  iYpwSignInResponse,
  iYpwGetResponse,
  iYpwKeyUser,
  iApiResponseModel,
} from '../interfaces/Interfaces';
import { YPW_API_URL, MY_KEY_USER, MY_APP, SWMS_API_URL, APP_NAME } from '@env';
import { Alert } from 'react-native';
import { AuthData } from '../types/types';
import useAuth from '../hooks/AuthContext';

// Get all the cities
export class UserService {
  public static ypwSignIn = async (user: iAuthSignIn) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post<iYpwSignInResponse>(
        `${YPW_API_URL}/api/v1/account/login`,
        {
          username: user.username_or_email,
          password: user.password,
          appConnect: APP_NAME,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.error) {
        Alert.alert(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data.res;
    } catch (error) {
      throw error;
    }
  };

  public static ypwSignOut = async (user_token: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post<iApiResponseModel>(
        `${YPW_API_URL}/api/v1/account/logout`,
        {
          appConnect: APP_NAME,
          keyUser: user_token,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.error) {
        Alert.alert(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  public static ypwGetUser = async (
    user_token: string | undefined
  ): Promise<iYpwUserData> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post<iYpwGetResponse>(
        `${YPW_API_URL}/api/v1/account/getUser`,
        {
          appConnect: APP_NAME,
          keyUser: user_token,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.error) {
        Alert.alert(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data.res;
    } catch (error) {
      throw error;
    }
  };
}

export class AuthService {
  // TODO: implement sign in method
  public static signIn = async (props: iAuthSignIn): Promise<iAuthResponse> => {
    try {
      const response = await axios.post<iAuthApiResponse>(
        `${SWMS_API_URL}/api/v1/user/sign_in`,
        {
          username_or_email: props.username_or_email,
          password: props.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.error) {
        console.log(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data.res;
    } catch (error) {
      console.error('Error login user to SWMS');
      throw error;
    }
  };

  // TODO: implement sign up method
  public static signUp = async (
    props: iAuthSignUp
  ): Promise<iAuthResponse | null> => {
    try {
      const response = await axios.post<iAuthApiResponse>(
        `${SWMS_API_URL}/api/v1/user/register`,
        {
          username: props.username,
          email: props.email,
          full_name: props.full_name,
          password: props.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.error) {
        console.log(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data.res;
    } catch (error) {
      console.error('Error register user to SWMS:', error);
      throw error;
    }
  };
}
