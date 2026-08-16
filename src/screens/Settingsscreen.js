import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import Button from '../components/Button';
import { useSettings } from '../hooks/useSettings';
import { COLORS } from '../config/colors';

export default function SettingsScreen() {
  const {
    agreement,
    disclaimer,
    marqueeText,
    marqueeSpeed,
    bannerText,
    recordingStops,
    updateLocalSetting,
    handleSaveSettings,
    handlePickBackgroundImage,
    handlePickBannerImage,
    handleClearRecordingStops,
  } = useSettings();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>⚙️ Админ-панель</Text>

      <Text style={styles.label}>Соглашение</Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={agreement}
        onChangeText={(text) => updateLocalSetting('agreement', text)}
      />

      <Text style={styles.label}>Дисклеймер (при выходе)</Text>
      <TextInput
        style={styles.textArea}
        multiline
        value={disclaimer}
        onChangeText={(text) => updateLocalSetting('disclaimer', text)}
      />

      <Text style={styles.label}>Бегущая строка</Text>
      <TextInput
        style={styles.input}
        value={marqueeText}
        onChangeText={(text) => updateLocalSetting('marqueeText', text)}
      />

      <Text style={styles.label}>Скорость (мс)</Text>
      <TextInput
        style={styles.input}
        value={marqueeSpeed}
        onChangeText={(text) => updateLocalSetting('marqueeSpeed', text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Текст под баннером</Text>
      <TextInput
        style={styles.input}
        value={bannerText}
        onChangeText={(text) => updateLocalSetting('bannerText', text)}
      />

      <Button title="Выбрать фон" onPress={handlePickBackgroundImage} style={styles.margin} />
      <Button title="Выбрать баннер" onPress={handlePickBannerImage} style={styles.margin} />
      <Button title="Сохранить всё" onPress={handleSaveSettings} style={styles.margin} />

      <Text style={styles.label}>📋 Остановки записи (клиенты, которые вышли)</Text>
      <Button
        title="Очистить список"
        onPress={handleClearRecordingStops}
        style={{ backgroundColor: COLORS.error, marginTop: 5 }}
      />
      <FlatList
        data={recordingStops}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stopItem}>
            <Text style={styles.stopText}>👤 {item.nickname}</Text>
            <Text style={styles.stopText}>🕒 {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.stopText}>Нет остановок</Text>}
        scrollEnabled={false}
        style={{ marginTop: 10 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    color: COLORS.gold,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 12,
    borderRadius: 8,
    minHeight: 80,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  margin: {
    marginTop: 10,
  },
  stopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  stopText: {
    color: COLORS.text,
    fontSize: 14,
  },
});
