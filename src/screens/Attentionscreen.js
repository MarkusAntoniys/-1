import React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Marquee from '../components/Marquee';
import UserCard from '../components/UserCard';
import { useAttentionScreen } from '../hooks/useAttentionScreen';
import { COLORS } from '../config/colors';

export default function AttentionScreen() {
  const {
    filteredUsers,
    search,
    setSearch,
    bannerImage,
    bannerText,
    isRecording,
    handleStartRecording,
  } = useAttentionScreen();

  return (
    <BackgroundImage style={styles.container}>
      <Marquee />
      {bannerImage && (
        <Image source={{ uri: bannerImage }} style={styles.banner} resizeMode="contain" />
      )}
      {bannerText && <Text style={styles.bannerText}>{bannerText}</Text>}

      <View style={styles.recorderRow}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleStartRecording}
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
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Пользователи не найдены</Text>
        }
      />
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  search: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  banner: {
    width: '100%',
    height: 150,
    marginVertical: 10,
  },
  bannerText: {
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 14,
  },
  recorderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  recordButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  recordButtonActive: {
    backgroundColor: COLORS.error,
  },
  recordText: {
    color: '#000',
    fontWeight: 'bold',
  },
  recordStatus: {
    color: COLORS.text,
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
  },
});
