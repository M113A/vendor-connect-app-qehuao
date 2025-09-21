
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
}

export default function LoadingSpinner({ 
  size = 'large', 
  text = 'Loading...', 
  color = colors.primary 
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={[commonStyles.textSecondary, styles.text]}>
          {text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
    textAlign: 'center',
  },
});
