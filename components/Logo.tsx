
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: any;
}

export default function Logo({ size = 'medium', showText = true, style }: LogoProps) {
  const logoSizes = {
    small: 40,
    medium: 80,
    large: 120,
  };

  const textSizes = {
    small: 16,
    medium: 24,
    large: 32,
  };

  // Placeholder logo - will be replaced with your actual logo
  const logoUri = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center';

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: logoUri }}
        style={[
          styles.logo,
          {
            width: logoSizes[size],
            height: logoSizes[size],
            borderRadius: logoSizes[size] / 2,
          },
        ]}
        resizeMode="cover"
      />
      {showText && (
        <Text style={[styles.text, { fontSize: textSizes[size] }]}>
          Khedmah Delivery
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: 12,
  },
  text: {
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
});
