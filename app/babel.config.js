module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: ['react-native-worklets/plugin'],
  };
};
