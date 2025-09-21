
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import SimpleBottomSheet from './BottomSheet';

interface SettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsBottomSheet({ isVisible, onClose }: SettingsBottomSheetProps) {
  const router = useRouter();

  const settingsOptions = [
    {
      icon: 'color-palette-outline',
      title: 'Logo & Branding',
      description: 'Upload your logo and customize colors',
      action: () => {
        onClose();
        router.push('/logo-settings');
      },
    },
    {
      icon: 'call-outline',
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => {
        onClose();
        router.push('/contact');
      },
    },
    {
      icon: 'mail-outline',
      title: 'Email Us',
      description: 'mubasher.tariq@khedmahdelivery.com',
      action: () => {
        Linking.openURL('mailto:mubasher.tariq@khedmahdelivery.com');
      },
    },
    {
      icon: 'call-outline',
      title: 'Call Us',
      description: '+96893207302',
      action: () => {
        Linking.openURL('tel:+96893207302');
      },
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      description: 'Learn more about Khedmah Delivery',
      action: () => {
        onClose();
        router.push('/platform-info');
      },
    },
  ];

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <Text style={[commonStyles.title, { flex: 1 }]}>Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                  paddingVertical: 16,
                },
              ]}
              onPress={option.action}
            >
              <View style={{
                backgroundColor: colors.backgroundAlt,
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={option.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.subtitle, { marginBottom: 4, fontSize: 16 }]}>
                  {option.title}
                </Text>
                <Text style={commonStyles.textSecondary}>{option.description}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 20 }} />
      </View>
    </SimpleBottomSheet>
  );
}
