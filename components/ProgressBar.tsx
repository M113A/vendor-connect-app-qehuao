
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

export default function ProgressBar({ 
  progress, 
  height = 8, 
  showPercentage = false,
  color = colors.primary,
  backgroundColor = colors.border,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      <View style={[
        styles.track, 
        { height, backgroundColor, borderRadius: height / 2 }
      ]}>
        <View style={[
          styles.fill, 
          { 
            width: `${clampedProgress}%`, 
            height, 
            backgroundColor: color,
            borderRadius: height / 2,
          }
        ]} />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  percentage: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
});
