import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

const SplashScreen = () => {
  const tokenCheck = async () => {};
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tokenCheck();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View className="flex-1 justify-center bg-white items-center">
      <Image
        source={require('../assets/images/logo_t.png')}
        className="h-[30%] w-[60%]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
