import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Button from '../components/Button';
import { getItem, removeItem, addRecordingStop } from '../utils/storage';
import { useAudio } from '../context/AudioContext';
import { COLORS } from '../styles/global';

export default function DisclaimerScreen({ navigation }) {
  const [text, setText] = useState('');
  const route = useRoute();
  const { nickname } = route.params || { nickname: 'Аноним' };
  const { stopRecording } = useAudio();

  useEffect(() => {
    const load = async () => {
      const d = await getItem('disclaimer_text');
      setText(d || 'Вы выходите из режима прослушки. Ваша запись будет остановлена.');
    };
    load();
  }, []);

  const confirmExit = async () => {
    await stopRecording();
    await addRecordingStop(nickname);
    await removeItem('user');
    await removeItem('is_recording');
    await removeItem('recording_user_nickname');
    navigation.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button title="Подтвердить выход" onPress={confirmExit} />
      <Button title="Отмена" onPress={() => navigation.goBack()} style={{ marginTop: 10, backgroundColor: '#444' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, justifyContent: 'center' },
  text: { color: COLORS.text, fontSize: 18, textAlign: 'center', marginBottom: 30 },
});
