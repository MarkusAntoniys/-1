import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import AvatarPicker from '../components/AvatarPicker';
import { useProfile } from '../hooks/useProfile';
import { COLORS } from '../config/colors';

export default function ProfileScreen() {
  const { name, setName, nickname, setNickname, handleSaveProfile } = useProfile();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>👤 Мой профиль</Text>

      <AvatarPicker />

      <Text style={styles.label}>Имя</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введите имя"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Никнейм</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="Введите никнейм"
        placeholderTextColor="#666"
      />

      <Button title="Сохранить профиль" onPress={handleSaveProfile} style={styles.saveButton} />
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
    marginTop: 15,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
  },
});
