import AsyncStorage from '@react-native-async-storage/async-storage';
import { logError, logInfo } from './logger';

/**
 * Сохранить значение в AsyncStorage
 * @param {string} key - Ключ
 * @param {*} value - Значение
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    logInfo('setItem', `Saved ${key}`);
  } catch (error) {
    logError('setItem', error);
  }
};

/**
 * Получить значение из AsyncStorage
 * @param {string} key - Ключ
 * @returns {*|null} Значение или null
 */
export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logError('getItem', error);
    return null;
  }
};

/**
 * Удалить значение из AsyncStorage
 * @param {string} key - Ключ
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    logInfo('removeItem', `Removed ${key}`);
  } catch (error) {
    logError('removeItem', error);
  }
};

/**
 * Добавить остановку записи (когда пользователь вышел)
 * @param {string} nickname - Никнейм пользователя
 */
export const addRecordingStop = async (nickname) => {
  try {
    if (!nickname) {
      throw new Error('Nickname is required');
    }
    const stops = (await getItem('recording_stops')) || [];
    stops.push({ nickname, timestamp: new Date().toISOString() });
    await setItem('recording_stops', stops);
    logInfo('addRecordingStop', `Added stop for ${nickname}`);
  } catch (error) {
    logError('addRecordingStop', error);
  }
};

/**
 * Получить все остановки записи
 * @returns {Array} Массив остановок
 */
export const getRecordingStops = async () => {
  try {
    return (await getItem('recording_stops')) || [];
  } catch (error) {
    logError('getRecordingStops', error);
    return [];
  }
};

/**
 * Очистить список остановок
 */
export const clearRecordingStops = async () => {
  try {
    await setItem('recording_stops', []);
    logInfo('clearRecordingStops', 'Recording stops cleared');
  } catch (error) {
    logError('clearRecordingStops', error);
  }
};
