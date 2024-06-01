import { Animated } from 'react-native';

export interface iHeaderProps {
  name: string;
  //onPressProfile: () => void;
}

export interface iCommunity {
  id: number;
  title: string;
  description: string;
  community: string;
  location: {
    lat: string | number;
    lng: string | number;
    address?: string | null;
  };
  contacts?: {
    tel?: string | null;
    fax?: string | null;
    link?: string | null;
  };
  email?: string;
  is_active: boolean;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
  town_id: string;
  img?: string; // La imagen es opcional
}

export interface iCommunities {
  id: string;
  title: string;
  description: string;
  community: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  contacts: {
    tel: string;
    fax: string;
  };
  email: string;
  is_active: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  town_id: string;
  img?: string; // La imagen es opcional
}

export interface iBackdropProps {
  scrollX: Animated.Value;
  communities: iCommunity[];
}

export interface iApiResponse<T> {
  status: number;
  error: boolean;
  message?: string;
  res: T;
  version: string;
}

export interface iLocationGPS {
  latitude: number | null;
  longitude: number | null;
}

export interface iYpwSignIn {
  username: string;
  password: string;
  appConnect: string;
}

export interface iYpwGetUser {
  appConnect: string;
  keyUser: string;
}

export interface iYpwUserData {
  userID: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  language: string;
  country: string;
  ypwCashBalance: number | null;
  shippingAddress: string | null;
  registrationDate: string;
  identificationCard: string;
  accountUpdateDate: string;
  accountVersion: string;
  timeZone: string;
  recoveryCode: string | null;
  applications: undefined | null;
  limitations: undefined | null;
  accountType: string;
  tradingExits: undefined | null;
  pendingInvoices: undefined | null;
  bills: undefined | null;
  subscriptions: undefined | null;
  metodoPago: undefined | null;
  servidorDB: undefined | null;
  userDB: undefined | null;
  puertoDB: undefined | null;
  pagWeb: string;
  passwordDB: undefined | null;
  data: string;
  block: number;
  developer: number;
  inBlock: number;
  numberCode: string | null;
  activate2FA: number;
  socialAccount: number;
}

export interface iYpwKeyUser {
  keyUser: string;
}

export interface iApiResponseModel {
  status: number;
  error: boolean;
  message: string;
  version: string;
}

export interface iYpwGetResponse extends iApiResponseModel {
  res: iYpwUserData;
}

export interface iYpwSignInResponse extends iApiResponseModel {
  res: iYpwKeyUser;
}

export interface iAuthApiResponse extends iApiResponseModel {
  res: iAuthResponse;
}

export interface iAuthSignIn {
  username_or_email: string;
  password: string;
}

export interface iAuthSignUp {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export interface iAuthResponse {
  user_token: string;
}
