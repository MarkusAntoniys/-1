// Mock данные
export const MOCK_USERS = [
  { id: '1', name: 'Алекс', nickname: 'alex', is_online: true },
  { id: '2', name: 'Мария', nickname: 'mary', is_online: false },
];

// Дефолтные настройки
export const DEFAULT_SETTINGS = {
  agreement: 'Пользовательское соглашение...',
  disclaimer: 'Вы выходите из прослушки...',
  marqueeText: 'Добро пожаловать!',
  marqueeSpeed: '10000',
  bannerText: '',
};

// Ключи для AsyncStorage
export const STORAGE_KEYS = {
  user: 'user',
  users: 'users',
  bannerImage: 'banner_image',
  bannerText: 'banner_text',
  backgroundImage: 'background_image',
  agreementText: 'agreement_text',
  disclaimerText: 'disclaimer_text',
  marqueeText: 'marquee_text',
  marqueeSpeed: 'marquee_speed',
  recordingStops: 'recording_stops',
  isRecording: 'is_recording',
  recordingUserNickname: 'recording_user_nickname',
};
