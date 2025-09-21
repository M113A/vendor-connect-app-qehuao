
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: any;
  variant?: 'full' | 'icon';
}

export default function Logo({ size = 'medium', showText = true, style, variant = 'full' }: LogoProps) {
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

  // Use the uploaded logo - the full logo with text
  const fullLogoUri = require('../assets/images/482de446-da71-4161-8c9e-fb288515785e.png');
  // Use the icon version for smaller displays
  const iconLogoUri = require('../assets/images/927fa3aa-25a5-43f7-98a9-b3d69d14a466.png');

  const logoToUse = variant === 'icon' ? iconLogoUri : fullLogoUri;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={logoToUse}
        style={[
          styles.logo,
          {
            width: variant === 'full' ? logoSizes[size] * 2 : logoSizes[size],
            height: logoSizes[size],
          },
        ]}
        resizeMode="contain"
      />
      {showText && variant === 'icon' && (
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
