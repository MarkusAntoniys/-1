import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../styles/global';

export default function UserCard({ user }) {
  const isOnline = user.is_online || false;

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar || 'https://via.placeholder.com/50' }} style={styles.avatar} />
      <Text style={styles.name}>{user.nickname || user.name || 'Аноним'}</Text>
      {isOnline && <View style={styles.onlineDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    color: COLORS.text,
    flex: 1,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.green,
  },
});
