
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import { storage, STORAGE_KEYS } from '../../utils/storage';

interface AppSettings {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  notifications: boolean;
  autoSave: boolean;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export default function AppSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    theme: 'light',
    notifications: true,
    autoSave: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await storage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await storage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(newSettings));
      setSettings(newSettings);
      console.log('Settings saved:', newSettings);
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  const updateSetting = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const renderLanguageOption = (lang: typeof languages[0]) => (
    <TouchableOpacity
      key={lang.code}
      style={[
        styles.optionItem,
        settings.language === lang.code && styles.selectedOption,
      ]}
      onPress={() => updateSetting('language', lang.code)}
    >
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, settings.language === lang.code && styles.selectedText]}>
          {lang.nativeName}
        </Text>
        <Text style={[styles.optionSubtitle, settings.language === lang.code && styles.selectedSubtext]}>
          {lang.name}
        </Text>
      </View>
      {settings.language === lang.code && (
        <Icon name="checkmark-circle" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  const renderThemeOption = (theme: 'light' | 'dark', title: string, subtitle: string, icon: string) => (
    <TouchableOpacity
      key={theme}
      style={[
        styles.optionItem,
        settings.theme === theme && styles.selectedOption,
      ]}
      onPress={() => updateSetting('theme', theme)}
    >
      <View style={styles.optionRow}>
        <View style={[
          styles.themeIcon,
          { backgroundColor: theme === 'light' ? colors.backgroundAlt : colors.text }
        ]}>
          <Icon 
            name={icon as any} 
            size={20} 
            color={theme === 'light' ? colors.text : colors.background} 
          />
        </View>
        <View style={styles.optionContent}>
          <Text style={[styles.optionTitle, settings.theme === theme && styles.selectedText]}>
            {title}
          </Text>
          <Text style={[styles.optionSubtitle, settings.theme === theme && styles.selectedSubtext]}>
            {subtitle}
          </Text>
        </View>
      </View>
      {settings.theme === theme && (
        <Icon name="checkmark-circle" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={commonStyles.text}>Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>App Settings</Text>
          </View>
        </View>

        {/* Language Settings */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Language</Text>
          <View style={commonStyles.card}>
            {languages.map(renderLanguageOption)}
          </View>
        </View>

        {/* Theme Settings */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Theme</Text>
          <View style={commonStyles.card}>
            {renderThemeOption('light', 'Light Mode', 'Clean and bright interface', 'sunny-outline')}
            <View style={styles.separator} />
            {renderThemeOption('dark', 'Dark Mode', 'Easy on the eyes in low light', 'moon-outline')}
          </View>
          <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
            Dark mode will be available in a future update
          </Text>
        </View>

        {/* Other Settings */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Preferences</Text>
          <View style={commonStyles.card}>
            <View style={styles.switchRow}>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Push Notifications</Text>
                <Text style={styles.optionSubtitle}>Get updates about your applications</Text>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={(value) => updateSetting('notifications', value)}
                trackColor={{ false: colors.grey, true: colors.primary }}
                thumbColor={colors.accent}
              />
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.switchRow}>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Auto-save Drafts</Text>
                <Text style={styles.optionSubtitle}>Automatically save form progress</Text>
              </View>
              <Switch
                value={settings.autoSave}
                onValueChange={(value) => updateSetting('autoSave', value)}
                trackColor={{ false: colors.grey, true: colors.primary }}
                thumbColor={colors.accent}
              />
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>About</Text>
          <View style={commonStyles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.optionTitle}>App Version</Text>
              <Text style={styles.optionSubtitle}>1.0.0</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Text style={styles.optionTitle}>Build</Text>
              <Text style={styles.optionSubtitle}>2024.01.15</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedOption: {
    backgroundColor: colors.backgroundAlt,
  },
  optionRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedText: {
    color: colors.primary,
  },
  selectedSubtext: {
    color: colors.primary,
    opacity: 0.8,
  },
  themeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  switchRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
};
