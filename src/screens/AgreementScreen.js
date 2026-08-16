import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { getItem, setItem } from '../utils/storage';
import { COLORS } from '../styles/global';

export default function AgreementScreen({ navigation }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const load = async () => {
      const t = await getItem('agreement_text');
      setText(t || 'Пользовательское соглашение...');
    };
    load();
  }, []);

  const accept = async () => {
    await setItem('agreement_accepted', true);
    navigation.replace('Attention');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
      <Button title="Принять" onPress={accept} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20, justifyContent: 'space-between' },
  text: { color: COLORS.text, fontSize: 16, lineHeight: 22 },
});
