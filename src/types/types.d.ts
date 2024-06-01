import { iAuthSignIn, iYpwUserData } from '../interfaces/Interfaces';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Community: undefined;
  MainTab: undefined;
};

export type DashboardStackProps = {
  Dashboard: undefined;
  Profile: undefined;
  Logout: undefined;
};

export type RootTabParamList = {
  DashboardStack: undefined;
  Map: undefined;
  History: undefined;
  route: undefined;
};

export type AuthContextData = {
  authData?: AuthData | string | undefined;
  userData?: iYpwUserData | undefined;
  loading: boolean;
  loadingGetUser: boolean;
  signIn: (user: iAuthSignIn) => void;
  signOut: () => void;
};

export type AuthData = {
  user_token: string;
};
