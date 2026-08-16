import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { getRecordingStops, clearRecordingStops as clearStops } from '../utils/storage';
import { pickImage } from '../utils/imageHelper';
import { logError, logInfo } from '../utils/logger';

/**
 * Хук для управления логикой экрана Settings
 */
export const useSettings = () => {
  const { settings, updateSettings, updateBackgroundImage, updateBannerImage } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);
  const [recordingStops, setRecordingStops] = useState([]);

  // Загрузить остановки записи
  useEffect(() => {
    const loadStops = async () => {
      try {
        const stops = await getRecordingStops();
        setRecordingStops(stops);
      } catch (error) {
        logError('useSettings.loadStops', error);
      }
    };
    loadStops();
  }, []);

  // Обновить локальные настройки при изменении глобальных
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  /**
   * Сохранить все настройки
   */
  const handleSaveSettings = useCallback(async () => {
    try {
      await updateSettings(localSettings);
      Alert.alert('Успешно', 'Все настройки сохранены');
      logInfo('useSettings', 'Settings saved');
    } catch (error) {
      logError('useSettings.handleSaveSettings', error);
      Alert.alert('Ошибка', 'Не удалось сохранить настройки');
    }
  }, [localSettings, updateSettings]);

  /**
   * Выбрать фон
   */
  const handlePickBackgroundImage = useCallback(async () => {
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        await updateBackgroundImage(imageUri);
        Alert.alert('Успешно', 'Фон обновлён');
        logInfo('useSettings', 'Background image updated');
      }
    } catch (error) {
      logError('useSettings.handlePickBackgroundImage', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображение');
    }
  }, [updateBackgroundImage]);

  /**
   * Выбрать баннер
   */
  const handlePickBannerImage = useCallback(async () => {
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        await updateBannerImage(imageUri);
        Alert.alert('Успешно', 'Баннер обновлён');
        logInfo('useSettings', 'Banner image updated');
      }
    } catch (error) {
      logError('useSettings.handlePickBannerImage', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображение');
    }
  }, [updateBannerImage]);

  /**
   * Очистить список остановок
   */
  const handleClearRecordingStops = useCallback(async () => {
    try {
      await clearStops();
      setRecordingStops([]);
      Alert.alert('Успешно', 'Список остановок очищен');
      logInfo('useSettings', 'Recording stops cleared');
    } catch (error) {
      logError('useSettings.handleClearRecordingStops', error);
      Alert.alert('Ошибка', 'Не удалось очистить список');
    }
  }, []);

  /**
   * Обновить локальное значение
   */
  const updateLocalSetting = useCallback((key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    agreement: localSettings.agreement,
    disclaimer: localSettings.disclaimer,
    marqueeText: localSettings.marqueeText,
    marqueeSpeed: localSettings.marqueeSpeed,
    bannerText: localSettings.bannerText,
    recordingStops,
    updateLocalSetting,
    handleSaveSettings,
    handlePickBackgroundImage,
    handlePickBannerImage,
    handleClearRecordingStops,
  };
};
