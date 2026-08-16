import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { logError, logInfo } from '../utils/logger';

/**
 * Хук для управления логикой экрана Profile
 */
export const useProfile = () => {
  const { user, updateUser } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [nickname, setNickname] = useState(user?.nickname || '');

  /**
   * Сохранить профиль
   */
  const handleSaveProfile = useCallback(async () => {
    if (!name || !nickname) {
      Alert.alert('Ошибка', 'Все поля обязательны');
      return;
    }

    try {
      const updatedUser = { ...user, name, nickname };
      await updateUser(updatedUser);
      Alert.alert('Успешно', 'Профиль сохранён');
      logInfo('useProfile', 'Profile saved');
    } catch (error) {
      logError('useProfile.handleSaveProfile', error);
      Alert.alert('Ошибка', 'Не удалось сохранить профиль');
    }
  }, [name, nickname, user, updateUser]);

  return {
    name,
    setName,
    nickname,
    setNickname,
    handleSaveProfile,
  };
};
