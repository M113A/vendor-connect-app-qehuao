
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';
import Logo from '../components/Logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={[commonStyles.container, styles.container]}>
      <View style={styles.content}>
        <Logo size="large" showText={false} variant="full" />
        <Text style={styles.tagline}>
          Delivering Excellence
        </Text>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <View style={styles.loadingProgress} />
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Khedmah Delivery Platform
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 60,
    width: 200,
  },
  loadingBar: {
    height: 4,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    width: '70%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
