
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import SettingsBottomSheet from '../components/SettingsBottomSheet';

export default function HomeScreen() {
  const router = useRouter();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const features = [
    {
      icon: 'restaurant-outline',
      title: 'Register Your Restaurant',
      description: 'Join our delivery platform and reach more customers',
      action: () => router.push('/registration'),
    },
    {
      icon: 'analytics-outline',
      title: 'Track Your Application',
      description: 'Monitor the status of your registration',
      action: () => router.push('/tracking'),
    },
    {
      icon: 'information-circle-outline',
      title: 'Platform Information',
      description: 'Learn about our services and packages',
      action: () => router.push('/platform-info'),
    },
    {
      icon: 'call-outline',
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => router.push('/contact'),
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
              <Icon name="settings-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Logo size="large" showText={true} style={{ marginBottom: 16 }} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 32 }]}>
              Partner with us to grow your restaurant business
            </Text>
          </View>
        </View>

        {/* Feature Cards */}
        <View style={commonStyles.section}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center' }]}
              onPress={feature.action}
            >
              <View style={{
                backgroundColor: colors.primary,
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={feature.icon as any} size={24} color={colors.background} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>{feature.title}</Text>
                <Text style={commonStyles.textSecondary}>{feature.description}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Why Choose Us?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 8, alignItems: 'center' }]}>
              <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24 }]}>500+</Text>
              <Text style={commonStyles.textSecondary}>Restaurants</Text>
            </View>
            <View style={[commonStyles.card, { flex: 1, marginLeft: 8, alignItems: 'center' }]}>
              <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24 }]}>50K+</Text>
              <Text style={commonStyles.textSecondary}>Orders Daily</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Settings Bottom Sheet */}
      <SettingsBottomSheet
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    </SafeAreaView>
  );
}
