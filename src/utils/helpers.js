import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { logError } from './logger';

/**
 * Запросить разрешение на доступ к библиотеке изображений
 */
export const requestImagePickerPermission = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Нет доступа к библиотеке изображений');
      return false;
    }
    return true;
  } catch (error) {
    logError('requestImagePickerPermission', error);
    return false;
  }
};

/**
 * Выбрать изображение из библиотеки
 * @param {Object} options - Опции для ImagePicker
 * @returns {string|null} URI изображения или null
 */
export const pickImage = async (options = {}) => {
  try {
    const hasPermission = await requestImagePickerPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      ...options,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    logError('pickImage', error);
    return null;
  }
};

/**
 * Форматировать дату
 * @param {string} dateString - ISO дата
 * @returns {string} Отформатированная дата
 */
export const formatDate = (dateString) => {
  try {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    logError('formatDate', error);
    return dateString;
  }
};

/**
 * Валидировать никнейм
 * @param {string} nickname - Никнейм
 * @returns {boolean} Валидный ли никнейм
 */
export const validateNickname = (nickname) => {
  if (!nickname || typeof nickname !== 'string') return false;
  const trimmed = nickname.trim();
  return trimmed.length >= 3 && trimmed.length <= 20;
};

/**
 * Валидировать имя
 * @param {string} name - Имя
 * @returns {boolean} Валидное ли имя
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50;
};
