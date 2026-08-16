import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS, DEFAULT_SETTINGS, MOCK_USERS } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Загрузить все данные приложения при запуске
  useEffect(() => {
    const loadAppData = async () => {
      try {
        logInfo('AppProvider', 'Loading app data...');

        const [userData, usersData, bannerImg, bgImg, allSettings] = await Promise.all([
          getItem(STORAGE_KEYS.user),
          getItem(STORAGE_KEYS.users),
          getItem(STORAGE_KEYS.bannerImage),
          getItem(STORAGE_KEYS.backgroundImage),
          loadAllSettings(),
        ]);

        setUser(userData);
        setUsers(usersData || MOCK_USERS);
        setBannerImage(bannerImg);
        setBackgroundImage(bgImg);
        setSettings({ ...DEFAULT_SETTINGS, ...allSettings });

        logInfo('AppProvider', 'App data loaded successfully');
      } catch (error) {
        logError('AppProvider.loadAppData', error);
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, []);

  /**
   * Загрузить все настройки из хранилища
   */
  const loadAllSettings = async () => {
    try {
      const [agreement, disclaimer, marqueeText, marqueeSpeed, bannerText] = await Promise.all([
        getItem(STORAGE_KEYS.agreementText),
        getItem(STORAGE_KEYS.disclaimerText),
        getItem(STORAGE_KEYS.marqueeText),
        getItem(STORAGE_KEYS.marqueeSpeed),
        getItem(STORAGE_KEYS.bannerText),
      ]);

      return {
        agreement: agreement || DEFAULT_SETTINGS.agreement,
        disclaimer: disclaimer || DEFAULT_SETTINGS.disclaimer,
        marqueeText: marqueeText || DEFAULT_SETTINGS.marqueeText,
        marqueeSpeed: marqueeSpeed || DEFAULT_SETTINGS.marqueeSpeed,
        bannerText: bannerText || DEFAULT_SETTINGS.bannerText,
      };
    } catch (error) {
      logError('loadAllSettings', error);
      return DEFAULT_SETTINGS;
    }
  };

  /**
   * Обновить настройки
   */
  const updateSettings = async (updates) => {
    try {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);

      const storageUpdates = {
        agreement: STORAGE_KEYS.agreementText,
        disclaimer: STORAGE_KEYS.disclaimerText,
        marqueeText: STORAGE_KEYS.marqueeText,
        marqueeSpeed: STORAGE_KEYS.marqueeSpeed,
        bannerText: STORAGE_KEYS.bannerText,
      };

      await Promise.all(
        Object.entries(updates)
          .filter(([key]) => storageUpdates[key])
          .map(([key, value]) => setItem(storageUpdates[key], value))
      );

      logInfo('updateSettings', 'Settings updated');
    } catch (error) {
      logError('updateSettings', error);
    }
  };

  /**
   * Обновить пользователя
   */
  const updateUser = async (userData) => {
    try {
      setUser(userData);
      await setItem(STORAGE_KEYS.user, userData);
      logInfo('updateUser', 'User updated');
    } catch (error) {
      logError('updateUser', error);
    }
  };

  /**
   * Обновить список пользователей
   */
  const updateUsers = async (usersList) => {
    try {
      setUsers(usersList);
      await setItem(STORAGE_KEYS.users, usersList);
      logInfo('updateUsers', 'Users list updated');
    } catch (error) {
      logError('updateUsers', error);
    }
  };

  /**
   * Обновить баннер
   */
  const updateBannerImage = async (imageUri) => {
    try {
      setBannerImage(imageUri);
      await setItem(STORAGE_KEYS.bannerImage, imageUri);
      logInfo('updateBannerImage', 'Banner image updated');
    } catch (error) {
      logError('updateBannerImage', error);
    }
  };

  /**
   * Обновить фон
   */
  const updateBackgroundImage = async (imageUri) => {
    try {
      setBackgroundImage(imageUri);
      await setItem(STORAGE_KEYS.backgroundImage, imageUri);
      logInfo('updateBackgroundImage', 'Background image updated');
    } catch (error) {
      logError('updateBackgroundImage', error);
    }
  };

  const value = {
    // State
    settings,
    user,
    users,
    loading,
    bannerImage,
    backgroundImage,
    // Methods
    updateSettings,
    updateUser,
    updateUsers,
    updateBannerImage,
    updateBackgroundImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Хук для использования AppContext
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
