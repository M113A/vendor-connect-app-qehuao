
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
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    {
      icon: 'restaurant-outline',
      title: 'Register Restaurant',
      description: 'Join our delivery platform',
      route: '/registration',
      color: colors.primary,
    },
    {
      icon: 'search-outline',
      title: 'Track Application',
      description: 'Check your submission status',
      route: '/tracking',
      color: colors.secondary,
    },
    {
      icon: 'information-circle-outline',
      title: 'Platform Info',
      description: 'Learn about our services',
      route: '/platform-info',
      color: colors.primary,
    },
    {
      icon: 'call-outline',
      title: 'Contact Us',
      description: 'Get support and schedule meetings',
      route: '/contact',
      color: colors.secondary,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <Logo size="medium" showText={false} variant="full" />
            <TouchableOpacity
              onPress={() => setShowSettings(true)}
              style={{
                backgroundColor: colors.backgroundAlt,
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="settings-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.title}>Welcome to Khedmah</Text>
          <Text style={[commonStyles.text, { marginBottom: 24 }]}>
            Join our delivery platform and grow your restaurant business with us. 
            Register your restaurant, track your application, and get started today.
          </Text>
        </View>

        {/* Menu Items */}
        <View style={commonStyles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                  paddingVertical: 20,
                },
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <View style={{
                backgroundColor: `${item.color}15`,
                borderRadius: 25,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.subtitle, { marginBottom: 4, fontSize: 18 }]}>
                  {item.title}
                </Text>
                <Text style={commonStyles.textSecondary}>{item.description}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Why Choose Khedmah?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[commonStyles.card, { flex: 1, marginRight: 8, alignItems: 'center', paddingVertical: 24 }]}>
              <Text style={[commonStyles.title, { color: colors.primary, marginBottom: 8 }]}>500+</Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>Partner Restaurants</Text>
            </View>
            <View style={[commonStyles.card, { flex: 1, marginLeft: 8, alignItems: 'center', paddingVertical: 24 }]}>
              <Text style={[commonStyles.title, { color: colors.secondary, marginBottom: 8 }]}>24/7</Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>Customer Support</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <SettingsBottomSheet
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </SafeAreaView>
  );
}
