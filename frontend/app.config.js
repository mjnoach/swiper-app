export default {
  expo: {
    entryPoint: './src/index.js',
    name: 'swiper-app',
    slug: 'swiper-app',
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
      bundleIdentifier: 'com.mjnoach.swiper-app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.mjnoach.swiper-app',
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: ['expo-asset', 'expo-font'],
  },
}
