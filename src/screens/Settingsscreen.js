import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import { getItem, setItem, getRecordingStops, clearRecordingStops } from '../utils/storage';
import { COLORS } from '../styles/global';

export default function SettingsScreen() {
  const [agreement, setAgreement] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [marqueeText, setMarqueeText] = useState('');
  const [marqueeSpeed, setMarqueeSpeed] = useState('10000');
  const [bannerText, setBannerText] = useState('');
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const load = async () => {
      setAgreement(await getItem('agreement_text') || 'Пользовательское соглашение...');
      setDisclaimer(await getItem('disclaimer_text') || 'Вы выходите из прослушки...');
      setMarqueeText(await getItem('marquee_text') || 'Добро пожаловать!');
      setMarqueeSpeed(await getItem('marquee_speed') || '10000');
      setBannerText(await getItem('banner_text') || '');
      const stopsData = await getRecordingStops();
      setStops(stopsData);
    };
    load();
  }, []);

  const saveSettings = async () => {
    await setItem('agreement_text', agreement);
    await setItem('disclaimer_text', disclaimer);
    await setItem('marquee_text', marqueeText);
    await setItem('marquee_speed', marqueeSpeed);
    await setItem('banner_text', bannerText);
    Alert.alert('Сохранено');
  };

  const pickBackgroundImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Нет доступа'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.8 });
    if (!result.canceled) {
      await setItem('background_image', result.assets[0].uri);
      Alert.alert('Фон обновлён');
    }
  };

  const pickBannerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Нет доступа'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.8 });
    if (!result.canceled) {
      await setItem('banner_image', result.assets[0].uri);
      Alert.alert('Баннер обновлён');
    }
  };

  const clearStops = async () => {
    await clearRecordingStops();
    setStops([]);
    Alert.alert('Список очищен');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>⚙️ Админ-панель</Text>
      
      <Text style={styles.label}>Соглашение</Text>
      <TextInput style={styles.textArea} multiline value={agreement} onChangeText={setAgreement} />
      
      <Text style={styles.label}>Дисклеймер (при выходе)</Text>
      <TextInput style={styles.textArea} multiline value={disclaimer} onChangeText={setDisclaimer} />
      
      <Text style={styles.label}>Бегущая строка</Text>
      <TextInput style={styles.input} value={marqueeText} onChangeText={setMarqueeText} />
      
      <Text style={styles.label}>Скорость (мс)</Text>
      <TextInput style={styles.input} value={marqueeSpeed} onChangeText={setMarqueeSpeed} keyboardType="numeric" />
      
      <Text style={styles.label}>Текст под баннером</Text>
      <TextInput style={styles.input} value={bannerText} onChangeText={setBannerText} />
      
      <Button title="Выбрать фон" onPress={pickBackgroundImage} style={styles.margin} />
      <Button title="Выбрать баннер" onPress={pickBannerImage} style={styles.margin} />
      <Button title="Сохранить всё" onPress={saveSettings} style={styles.margin} />

      <Text style={styles.label}>📋 Остановки записи (клиенты, которые вышли)</Text>
      <Button title="Очистить список" onPress={clearStops} style={{ backgroundColor: '#cc3333', marginTop: 5 }} />
      <FlatList
        data={stops}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stopItem}>
            <Text style={styles.stopText}>👤 {item.nickname}</Text>
            <Text style={styles.stopText}>🕒 {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.stopText}>Нет остановок</Text>}
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { color: COLORS.gold, fontSize: 24, marginBottom: 20, textAlign: 'center' },
  label: { color: COLORS.text, marginTop: 10, marginBottom: 5 },
  input: { backgroundColor: COLORS.card, color: COLORS.text, padding: 12, borderRadius: 8, marginBottom: 10 },
  textArea: { backgroundColor: COLORS.card, color: COLORS.text, padding: 12, borderRadius: 8, minHeight: 80, marginBottom: 10 },
  margin: { marginTop: 10 },
  stopItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333' },
  stopText: { color: COLORS.text, fontSize: 14 },
});
