const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {
    transformer: require("react-native-svg-transformer"),
    resolver: require.resolve()
});

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
