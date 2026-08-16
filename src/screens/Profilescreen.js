import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../components/BackgroundImage';
import AvatarPicker from '../components/AvatarPicker';
import Button from '../components/Button';
import { getItem, setItem } from '../utils/storage';
import { COLORS } from '../styles/global';

export default function ProfileScreen() {
  const [user, setUser] = useState({ name: '', surname: '', nickname: '', bio: '', avatar: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getItem('user');
      if (data) {
        setUser({
          name: data.name || '',
          surname: data.surname || '',
          nickname: data.nickname || '',
          bio: data.bio || '',
          avatar: data.avatar || '',
        });
        setIsAdmin(data.is_admin || false);
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const current = await getItem('user');
    const updated = { ...current, ...user };
    await setItem('user', updated);
    alert('Профиль сохранён');
  };

  const handleAvatarChange = (uri) => {
    setUser({ ...user, avatar: uri });
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <AvatarPicker avatarUri={user.avatar} onAvatarChange={handleAvatarChange} />
        <TextInput
          style={styles.input}
          placeholder="Имя"
          placeholderTextColor="#666"
          value={user.name}
          onChangeText={t => setUser({ ...user, name: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Фамилия"
          placeholderTextColor="#666"
          value={user.surname}
          onChangeText={t => setUser({ ...user, surname: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="Никнейм"
          placeholderTextColor="#666"
          value={user.nickname}
          onChangeText={t => setUser({ ...user, nickname: t })}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="О себе"
          placeholderTextColor="#666"
          multiline
          value={user.bio}
          onChangeText={t => setUser({ ...user, bio: t })}
        />
        <Button title="Сохранить" onPress={saveProfile} />
        {isAdmin && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.adminText}>⚙️ Администрирование</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => navigation.navigate('Disclaimer', { nickname: user.nickname })}
        >
          <Text style={styles.adminText}>🚪 Выйти из прослушки</Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20, paddingTop: 20 },
  input: { backgroundColor: COLORS.card, color: COLORS.text, padding: 15, borderRadius: 10, marginVertical: 5 },
  adminButton: { marginTop: 15, padding: 15, backgroundColor: COLORS.card, borderRadius: 10, alignItems: 'center' },
  adminText: { color: COLORS.gold, fontWeight: 'bold' },
});
