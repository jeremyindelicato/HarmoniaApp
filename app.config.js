// app.config.js
export default {
  expo: {
    name: 'harmonia',
    slug: 'harmonia',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'harmonia',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabaseUrl: 'https://iyjrmvrvqlmzqsjmnwjh.supabase.co',
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5anJtdnJ2cWxtenFzam1ud2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDc3MDIsImV4cCI6MjA2NTIyMzcwMn0.fHxFklimPvYgYtXMIwpoGVWFGa3EkwQ8zr4ZEKe01AA',
    },
  },
}
