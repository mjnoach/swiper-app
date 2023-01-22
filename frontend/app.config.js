export default {
  expo: {
    entryPoint: './src/index.js',
    name: 'dating-app',
    slug: 'dating-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mjnoach.dating-app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.mjnoach.dating_app',
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    extra: {
      API_URL: process.env.API_URL,
    },
    plugins: ['expo-asset', 'expo-font'],
  },
}
