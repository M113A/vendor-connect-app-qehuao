
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';
import Logo from '../components/Logo';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Join Khedmah Delivery',
    description: 'Register your restaurant or cafe with our trusted delivery platform and reach more customers.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    icon: 'restaurant-outline',
  },
  {
    id: 2,
    title: 'Easy Registration',
    description: 'Simple step-by-step process to get your business registered and verified quickly.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
    icon: 'document-text-outline',
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description: 'Monitor your application status and get real-time updates on your registration process.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    icon: 'analytics-outline',
  },
  {
    id: 4,
    title: 'Grow Your Business',
    description: 'Start receiving orders and grow your business with our comprehensive delivery platform.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    icon: 'trending-up-outline',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/');
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  const renderSlide = (slide: OnboardingSlide) => (
    <View style={{ width: Dimensions.get('window').width, alignItems: 'center', paddingHorizontal: 20 }}>
      <View style={{
        backgroundColor: `${colors.primary}15`,
        borderRadius: 100,
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
      }}>
        <Icon name={slide.icon as any} size={80} color={colors.primary} />
      </View>
      
      <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
        {slide.title}
      </Text>
      
      <Text style={[commonStyles.text, { textAlign: 'center', lineHeight: 24 }]}>
        {slide.description}
      </Text>
    </View>
  );

  const renderPagination = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 30 }}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: currentSlide === index ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: currentSlide === index ? colors.primary : colors.grey,
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20, alignItems: 'center' }]}>
          <Logo size="medium" showText={false} variant="full" />
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={[commonStyles.text, { color: colors.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Slides */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentSlide(slideIndex);
          }}
          style={{ flex: 1 }}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={{ flex: 1, justifyContent: 'center' }}>
              {renderSlide(slide)}
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        {renderPagination()}

        {/* Navigation */}
        <View style={[commonStyles.section, { paddingBottom: 40 }]}>
          <Button
            text={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
