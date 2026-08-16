import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { getItem } from '../utils/storage';

export default function BackgroundImage({ children, style }) {
  const [imageUri, setImageUri] = React.useState(null);

  React.useEffect(() => {
    const loadBg = async () => {
      const uri = await getItem('background_image');
      setImageUri(uri);
    };
    loadBg();
  }, []);

  if (imageUri) {
    return (
      <ImageBackground source={{ uri: imageUri }} style={[styles.image, style]} resizeMode="cover">
        {children}
      </ImageBackground>
    );
  }
  return <View style={[styles.default, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  image: { flex: 1, width: '100%' },
  default: { flex: 1, backgroundColor: '#000' },
});
