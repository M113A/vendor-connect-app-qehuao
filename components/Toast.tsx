
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  visible, 
  onHide, 
  duration = 3000 
}: ToastProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible, fadeAnim, duration, onHide]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return { 
          backgroundColor: colors.success, 
          icon: 'checkmark-circle-outline' as const 
        };
      case 'error':
        return { 
          backgroundColor: colors.error, 
          icon: 'alert-circle-outline' as const 
        };
      case 'info':
        return { 
          backgroundColor: colors.accent, 
          icon: 'information-circle-outline' as const 
        };
      default:
        return { 
          backgroundColor: colors.grey, 
          icon: 'information-circle-outline' as const 
        };
    }
  };

  const config = getToastConfig();

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: config.backgroundColor, opacity: fadeAnim }
      ]}
    >
      <Icon name={config.icon} size={20} color={colors.background} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  message: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
});
