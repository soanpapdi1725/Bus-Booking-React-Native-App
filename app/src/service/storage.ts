import { createMMKV, MMKV } from 'react-native-mmkv';

export const storage = createMMKV();

type tokenType = 'AccessToken' | 'RefreshToken';

export const setToken = (tokenType: tokenType, token: string) => {
  storage.set(tokenType, token);
};

export const getToken = (tokenType: tokenType) => {
  storage.getString(tokenType);
};

export const removeToken = (tokenType: tokenType) => {
  storage.remove(tokenType);
};
