
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import SimpleBottomSheet from './BottomSheet';

interface SettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsBottomSheet({ isVisible, onClose }: SettingsBottomSheetProps) {
  const settingsOptions = [
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help with your registration',
      action: () => {
        onClose();
        // Navigate to contact screen
      },
    },
    {
      icon: 'document-text-outline',
      title: 'Terms & Conditions',
      subtitle: 'Read our terms of service',
      action: () => {
        Linking.openURL('https://khedmahdelivery.com/terms');
      },
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      action: () => {
        Linking.openURL('https://khedmahdelivery.com/privacy');
      },
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      subtitle: 'Learn more about Khedmah Delivery',
      action: () => {
        // Show about info
      },
    },
  ];

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text style={[commonStyles.title, { marginBottom: 20 }]}>Settings</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { 
                flexDirection: 'row', 
                alignItems: 'center',
                marginBottom: 12,
                backgroundColor: colors.backgroundAlt,
              }]}
              onPress={option.action}
            >
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={option.icon as any} size={20} color={colors.background} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                  {option.title}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {option.subtitle}
                </Text>
              </View>
              <Icon name="chevron-forward-outline" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            Khedmah Delivery Partner App v1.0.0
          </Text>
        </View>
      </View>
    </SimpleBottomSheet>
  );
}
