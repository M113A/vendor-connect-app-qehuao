
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

interface StatusBadgeProps {
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending';
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'submitted':
        return { color: colors.warning, text: 'Submitted' };
      case 'under_review':
        return { color: colors.accent, text: 'Under Review' };
      case 'approved':
        return { color: colors.success, text: 'Approved' };
      case 'rejected':
        return { color: colors.error, text: 'Rejected' };
      case 'pending':
        return { color: colors.grey, text: 'Pending' };
      default:
        return { color: colors.grey, text: 'Unknown' };
    }
  };

  const config = getStatusConfig();
  const sizeStyle = styles[size];

  return (
    <View style={[styles.badge, { backgroundColor: config.color }, sizeStyle]}>
      <Text style={[styles.text, { fontSize: sizeStyle.fontSize }]}>
        {config.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.background,
    fontWeight: '600',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
  },
  large: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 14,
  },
});
