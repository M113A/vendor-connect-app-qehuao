
import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center' }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 32,
          }}
          resizeMode="cover"
        />
        
        <Text style={[commonStyles.title, { marginBottom: 8 }]}>
          Khedmah Delivery
        </Text>
        
        <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 48 }]}>
          Partner Registration Platform
        </Text>
        
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </SafeAreaView>
  );
}
