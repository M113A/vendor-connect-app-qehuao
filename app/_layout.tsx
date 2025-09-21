
import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../contexts/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="splash" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="index" />
            <Stack.Screen name="registration/index" />
            <Stack.Screen name="tracking/index" />
            <Stack.Screen name="platform-info/index" />
            <Stack.Screen name="contact/index" />
            <Stack.Screen name="app-settings/index" />
            <Stack.Screen name="logo-settings/index" />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
