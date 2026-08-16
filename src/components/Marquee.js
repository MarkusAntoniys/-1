import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { getItem } from '../utils/storage';

export default function Marquee({ speed = 10000 }) {
  const [text, setText] = React.useState('');
  const [speedState, setSpeedState] = React.useState(speed);
  const anim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loadMarquee = async () => {
      const storedText = await getItem('marquee_text');
      const storedSpeed = await getItem('marquee_speed');
      if (storedText) setText(storedText);
      if (storedSpeed) setSpeedState(parseInt(storedSpeed, 10));
    };
    loadMarquee();
  }, []);

  React.useEffect(() => {
    if (!text) return;
    const startAnimation = () => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: speedState,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };
    startAnimation();
  }, [text, speedState]);

  if (!text) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textWrapper,
          {
            transform: [
              {
                translateX: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, -300],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    paddingVertical: 5,
    overflow: 'hidden',
    height: 30,
  },
  textWrapper: {
    flexDirection: 'row',
  },
  text: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});
