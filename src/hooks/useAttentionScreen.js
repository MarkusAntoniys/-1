import { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-audio';
import { Alert } from 'react-native';
import { useAudio } from '../context/AudioContext';
import { useApp } from '../context/AppContext';
import { setItem } from '../utils/storage';
import { STORAGE_KEYS } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

/**
 * Хук для управления логикой экрана Attention
 */
export const useAttentionScreen = () => {
  const { isRecording, startRecording } = useAudio();
  const { users, bannerImage, settings, user } = useApp();
  const [search, setSearch] = useState('');
  const [userNickname, setUserNickname] = useState('');

  // Загрузить никнейм пользователя при загрузке
  useEffect(() => {
    const loadUserNickname = async () => {
      try {
        if (user && user.nickname) {
          setUserNickname(user.nickname);
        }
      } catch (error) {
        logError('useAttentionScreen.loadUserNickname', error);
      }
    };
    loadUserNickname();
  }, [user]);

  /**
   * Запросить разрешение на микрофон и начать запись
   */
  const handleStartRecording = useCallback(async () => {
    try {
      if (isRecording) {
        Alert.alert('Внимание', 'Запись уже идёт. Остановить можно только через выход из прослушки');
        return;
      }

      // Запросить разрешение на микрофон
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('Ошибка', 'Нет разрешения на доступ к микрофону');
        return;
      }

      await startRecording();
      await setItem(STORAGE_KEYS.isRecording, true);
      await setItem(STORAGE_KEYS.recordingUserNickname, userNickname || 'Аноним');
      Alert.alert('Запись начата', 'Микрофон активен в фоне');
      logInfo('useAttentionScreen', 'Recording started successfully');
    } catch (error) {
      logError('useAttentionScreen.handleStartRecording', error);
      Alert.alert('Ошибка', 'Не удалось начать запись');
    }
  }, [isRecording, startRecording, userNickname]);

  /**
   * Отфильтрованный список пользователей
   */
  const filteredUsers = users.filter((u) =>
    u.nickname?.toLowerCase().includes(search.toLowerCase())
  );

  return {
    filteredUsers,
    search,
    setSearch,
    bannerImage,
    bannerText: settings.bannerText,
    isRecording,
    handleStartRecording,
    userNickname,
  };
};
