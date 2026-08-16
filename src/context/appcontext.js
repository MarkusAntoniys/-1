import React, { createContext, useContext, useState, useEffect } from 'react';
import * as StorageUtils from '../utils/storage';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../config/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppData = async () => {
      const [userData, usersData, settingsData] = await Promise.all([
        StorageUtils.getItem(STORAGE_KEYS.user),
        StorageUtils.getItem(STORAGE_KEYS.users),
        loadSettings(),
      ]);
      
      setUser(userData);
      setUsers(usersData || MOCK_USERS);
      setSettings({ ...DEFAULT_SETTINGS, ...settingsData });
      setLoading(false);
    };
    
    loadAppData();
  }, []);

  const loadSettings = async () => {
    const [agreement, disclaimer, marqueeText, marqueeSpeed] = await Promise.all([
      StorageUtils.getItem(STORAGE_KEYS.agreement),
      StorageUtils.getItem(STORAGE_KEYS.disclaimer),
      StorageUtils.getItem(STORAGE_KEYS.marqueeText),
      StorageUtils.getItem(STORAGE_KEYS.marqueeSpeed),
    ]);
    return { agreement, disclaimer, marqueeText, marqueeSpeed };
  };

  const updateSettings = async (updates) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    await Promise.all(
      Object.entries(updates).map(([key, value]) => 
        StorageUtils.setItem(STORAGE_KEYS[key], value)
      )
    );
  };

  return (
    <AppContext.Provider value={{ settings, user, users, loading, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
