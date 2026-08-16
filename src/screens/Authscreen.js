import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { setItem } from '../utils/storage';
import { ADMIN_PHONE } from '../config/admin';
import { COLORS } from '../styles/global';

export default function AuthScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Ошибка', 'Введите корректный номер телефона');
      return;
    }
    const isAdmin = phone === ADMIN_PHONE;
    await setItem('user', { phone, is_admin: isAdmin });
    navigation.replace('Attention');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход по телефону</Text>
      <TextInput
        style={styles.input}
        placeholder="+7 999 999 99 99"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});
