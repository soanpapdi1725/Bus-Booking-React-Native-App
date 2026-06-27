import { resetAndNavigate } from '../../utils/NavigationUtils';
import { apiClient } from '../apiClient';
import { BASE_URL } from '../config.service';
import { getToken, removeToken, setToken } from '../storage';

export const loginWithGoogle = async (id_token: String) => {
  const { data } = await apiClient.post(`${BASE_URL}/auth/login`, {
    id_token: id_token,
  });
  //   Backend will give access and refresh token
  //   Access token will be frequently used for seeing login/logout state while refresh token will be used for updating access token
  setToken('AccessToken', data?.accessToken);
  setToken('RefreshToken', data?.refreshToken);
  return data?.user;
};

export const logoutUserAccount = async () => {
  removeToken('AccessToken');
  removeToken('RefreshToken');
  resetAndNavigate('LoginScreen');
};

export const refreshAccessToken = async (): Promise<Boolean> => {
  try {
    const refreshToken = getToken('RefreshToken');
    if (!refreshAccessToken) {
      return false;
    }
    const { data } = await apiClient.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    if (data?.newAccessToken) {
      setToken('AccessToken', data?.newAccessToken);
      return true;
    } else {
      throw new Error('Invalid Refresh Token');
    }
  } catch (error) {
    console.log('Token Refresh Failed: ', error);
    logoutUserAccount();
    return false;
  }
};
