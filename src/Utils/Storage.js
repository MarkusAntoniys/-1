import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

export const getItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) { return null; }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};

// Список остановок записи (для суперюзера)
export const addRecordingStop = async (nickname) => {
  const stops = await getItem('recording_stops') || [];
  stops.push({ nickname, timestamp: new Date().toISOString() });
  await setItem('recording_stops', stops);
};

export const getRecordingStops = async () => {
  return await getItem('recording_stops') || [];
};

export const clearRecordingStops = async () => {
  await setItem('recording_stops', []);
};
