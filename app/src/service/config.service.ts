import { Platform } from 'react-native';

export const BASE_URL: string =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:4000/api/v1'
    : 'http://localhost:4000/api/v1';
