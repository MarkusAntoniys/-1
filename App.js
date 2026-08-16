import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AudioProvider } from './src/context/AudioContext';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/Authscreen';
import { useApp } from './src/context/AppContext';
import { logInfo } from './src/utils/logger';

function AppContent() {
  const { user, loading } = useApp();

  if (loading) {
    return null; // Показываем splash screen пока загружаются данные
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    logInfo('App', 'Application started');
  }, []);

  return (
    <AppProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </AppProvider>
  );
}
