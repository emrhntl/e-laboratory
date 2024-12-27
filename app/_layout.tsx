import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Splash' }} />
        <Stack.Screen name="login/index" options={{ title: 'Login' }} />
        <Stack.Screen name="admin/CreateGuide" options={{ title: 'Admin Guide' }} />
        <Stack.Screen name="user/MyAnalysis" options={{ title: 'User Analysis' }} />
      </Stack>
    </AuthProvider>
  );
}
