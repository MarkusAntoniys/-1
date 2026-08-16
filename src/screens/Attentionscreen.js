import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Marquee from '../components/Marquee';
import UserCard from '../components/UserCard';
import { getItem, setItem } from '../utils/storage';
import { useAudio } from '../context/AudioContext';
import { COLORS } from '../styles/global';

export default function AttentionScreen() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerText, setBannerText] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const { isRecording, startRecording } = useAudio();

  useEffect(() => {
    const loadData = async () => {
      const storedUsers = await getItem('users');
      if (storedUsers) setUsers(storedUsers);
      else {
        const mock = [
          { id: '1', name: 'Алекс', nickname: 'alex', is_online: true },
          { id: '2', name: 'Мария', nickname: 'mary', is_online: false },
        ];
        setUsers(mock);
      }
      const img = await getItem('banner_image');
      const txt = await getItem('banner_text');
      if (img) setBannerImage(img);
      if (txt) setBannerText(txt);
      const user = await getItem('user');
      if (user && user.nickname) setUserNickname(user.nickname);
    };
    loadData();
  }, []);

  const handleStart = async () => {
    if (isRecording) {
      Alert.alert('Запись уже идёт', 'Остановить можно только через выход из прослушки');
      return;
    }
    // запрос разрешения (если ещё не дано)
    const { granted } = await Audio.requestPermissionsAsync?.() || { granted: true };
    await startRecording();
    await setItem('is_recording', true);
    await setItem('recording_user_nickname', userNickname || 'Аноним');
    Alert.alert('Запись начата', 'Микрофон активен в фоне');
  };

  const filtered = users.filter(u =>
    u.nickname?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BackgroundImage style={styles.container}>
      <Marquee />
      {bannerImage && <Image source={{ uri: bannerImage }} style={styles.banner} resizeMode="contain" />}
      {bannerText && <Text style={styles.bannerText}>{bannerText}</Text>}

      <View style={styles.recorderRow}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleStart}
        >
          <Text style={styles.recordText}>
            {isRecording ? '🎤 Запись активна' : '🎤 Начать запись (фон)'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.recordStatus}>
          {isRecording ? '🔴 Идёт запись' : '⚪ Запись не активна'}
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Поиск по никнейму..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 15, paddingTop: 10 },
  search: { backgroundColor: COLORS.card, color: COLORS.text, padding: 12, borderRadius: 10, marginVertical: 10 },
  banner: { width: '100%', height: 150, marginVertical: 10 },
  bannerText: { color: COLORS.text, textAlign: 'center', marginBottom: 5 },
  recorderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  recordButton: { backgroundColor: COLORS.gold, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30 },
  recordButtonActive: { backgroundColor: '#cc3333' },
  recordText: { color: '#000', fontWeight: 'bold' },
  recordStatus: { color: COLORS.text, fontSize: 14 },
});
