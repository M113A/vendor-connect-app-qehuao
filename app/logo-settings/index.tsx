
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import LogoUploader from '../../components/LogoUploader';

export default function LogoSettingsScreen() {
  const router = useRouter();
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);

  const handleLogoUpdate = (logoUri: string) => {
    console.log('Logo updated:', logoUri);
    setCurrentLogo(logoUri);
  };

  const handleColorsExtracted = (extractedColors: any) => {
    console.log('Colors extracted:', extractedColors);
    // Here you would update the global theme
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>Logo & Branding</Text>
          </View>
        </View>

        {/* Current Logo Preview */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Current Logo</Text>
          <View style={[commonStyles.card, { alignItems: 'center', paddingVertical: 32 }]}>
            <Logo size="large" showText={true} />
            <Text style={[commonStyles.textSecondary, { marginTop: 16, textAlign: 'center' }]}>
              This is how your logo appears in the app
            </Text>
          </View>
        </View>

        {/* Logo Uploader */}
        <View style={commonStyles.section}>
          <LogoUploader
            onLogoUpdate={handleLogoUpdate}
            onColorsExtracted={handleColorsExtracted}
          />
        </View>

        {/* Color Preview */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Current Color Scheme</Text>
          <View style={commonStyles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary,
                  marginBottom: 8,
                }} />
                <Text style={commonStyles.textSecondary}>Primary</Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>{colors.primary}</Text>
              </View>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.secondary,
                  marginBottom: 8,
                }} />
                <Text style={commonStyles.textSecondary}>Secondary</Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>{colors.secondary}</Text>
              </View>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.accent,
                  marginBottom: 8,
                }} />
                <Text style={commonStyles.textSecondary}>Accent</Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>{colors.accent}</Text>
              </View>
            </View>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 14 }]}>
              Colors will be automatically updated when you upload your logo
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
