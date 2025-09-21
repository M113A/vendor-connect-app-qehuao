
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: 'Join Our Platform',
      description: 'Register your restaurant or cafe with Khedmah Delivery and reach thousands of customers',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop',
      icon: 'restaurant-outline',
    },
    {
      id: 2,
      title: 'Easy Registration',
      description: 'Simple 3-step process to get your business listed on our platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      icon: 'document-text-outline',
    },
    {
      id: 3,
      title: 'Track Progress',
      description: 'Monitor your application status and get real-time updates on your registration',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      icon: 'analytics-outline',
    },
  ];

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
    <View style={{ width, alignItems: 'center', paddingHorizontal: 20 }}>
      <View style={{
        backgroundColor: colors.primary,
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
      }}>
        <Icon name={slide.icon as any} size={40} color={colors.background} />
      </View>
      
      <Image
        source={{ uri: slide.image }}
        style={{
          width: width * 0.8,
          height: 200,
          borderRadius: 12,
          marginBottom: 32,
        }}
        resizeMode="cover"
      />
      
      <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
        {slide.title}
      </Text>
      
      <Text style={[commonStyles.text, { textAlign: 'center', lineHeight: 24 }]}>
        {slide.description}
      </Text>
    </View>
  );

  const renderPagination = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 32 }}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: index === currentSlide ? colors.primary : colors.border,
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Skip Button */}
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, paddingTop: 20 }}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[commonStyles.textSecondary, { fontSize: 16 }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Slides */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentSlide(slideIndex);
          }}
          style={{ flex: 1 }}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={{ justifyContent: 'center', flex: 1 }}>
              {renderSlide(slide)}
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        {renderPagination()}

        {/* Navigation Button */}
        <View style={[commonStyles.section, { paddingBottom: 20 }]}>
          <Button
            text={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
