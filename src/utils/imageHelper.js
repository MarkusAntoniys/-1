import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { logError } from './logger';

/**
Запросить разрешение на доступ к библиотеке изображений
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
Выбрать изображение из библиотеки
@param {Object} options - Опции для ImagePicker
@returns {string|null} URI изображения или null
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
