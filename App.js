import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AudioProvider } from './src/context/AudioContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { getItem } from './src/utils/storage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const u = await getItem('user');
      if (u) setUser(u);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return null;

  return (
    <AudioProvider>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthScreen />}
      </NavigationContainer>
    </AudioProvider>
  );
}
