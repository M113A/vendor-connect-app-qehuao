
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';

interface Package {
  id: string;
  name: string;
  price: string;
  commission: string;
  features: string[];
  popular?: boolean;
}

export default function PlatformInfoScreen() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const packages: Package[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 'Free',
      commission: '15%',
      features: [
        'Online ordering system',
        'Basic analytics',
        'Customer support',
        'Standard delivery',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$99/month',
      commission: '12%',
      popular: true,
      features: [
        'All Basic features',
        'Advanced analytics',
        'Priority support',
        'Marketing tools',
        'Custom branding',
        'Faster delivery',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 'Custom',
      commission: '10%',
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solution',
        'Advanced reporting',
        'API access',
      ],
    },
  ];

  const benefits = [
    {
      icon: 'people-outline',
      title: 'Reach More Customers',
      description: 'Access to thousands of hungry customers in your area',
    },
    {
      icon: 'trending-up-outline',
      title: 'Increase Revenue',
      description: 'Boost your sales with our proven delivery platform',
    },
    {
      icon: 'phone-portrait-outline',
      title: 'Easy Management',
      description: 'Manage orders, menu, and analytics from one dashboard',
    },
    {
      icon: 'flash-outline',
      title: 'Fast Delivery',
      description: 'Our efficient delivery network ensures quick service',
    },
  ];

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsBottomSheetVisible(true);
  };

  const renderPackageCard = (pkg: Package) => (
    <TouchableOpacity
      key={pkg.id}
      style={[
        commonStyles.card,
        {
          borderWidth: pkg.popular ? 2 : 1,
          borderColor: pkg.popular ? colors.primary : colors.border,
          position: 'relative',
        }
      ]}
      onPress={() => handlePackageSelect(pkg)}
    >
      {pkg.popular && (
        <View style={{
          position: 'absolute',
          top: -10,
          right: 20,
          backgroundColor: colors.primary,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{ color: colors.background, fontSize: 12, fontWeight: '600' }}>
            Most Popular
          </Text>
        </View>
      )}
      
      <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>{pkg.name}</Text>
      <Text style={[commonStyles.title, { color: colors.primary, fontSize: 24, marginBottom: 4 }]}>
        {pkg.price}
      </Text>
      <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
        {pkg.commission} commission per order
      </Text>
      
      {pkg.features.map((feature, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="checkmark-circle-outline" size={16} color={colors.success} style={{ marginRight: 8 }} />
          <Text style={commonStyles.textSecondary}>{feature}</Text>
        </View>
      ))}
      
      <TouchableOpacity
        style={[
          pkg.popular ? commonStyles.button : commonStyles.secondaryButton,
          { marginTop: 16 }
        ]}
        onPress={() => handlePackageSelect(pkg)}
      >
        <Text style={pkg.popular ? commonStyles.buttonText : commonStyles.secondaryButtonText}>
          Choose Plan
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>Platform Information</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* About Section */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>About Khedmah Delivery</Text>
            <Text style={[commonStyles.text, { marginBottom: 16 }]}>
              Khedmah Delivery is the leading food delivery platform connecting restaurants with customers across the region. 
              We provide a comprehensive solution for restaurants to expand their reach and increase revenue through our 
              efficient delivery network.
            </Text>
          </View>

          {/* Benefits */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Why Partner With Us?</Text>
            {benefits.map((benefit, index) => (
              <View key={index} style={[commonStyles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Icon name={benefit.icon as any} size={24} color={colors.background} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {benefit.title}
                  </Text>
                  <Text style={commonStyles.textSecondary}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Packages */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Choose Your Package</Text>
            {packages.map(renderPackageCard)}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {/* Package Details Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedPackage && (
          <View style={{ padding: 20 }}>
            <Text style={[commonStyles.title, { marginBottom: 16 }]}>
              {selectedPackage.name}
            </Text>
            <Text style={[commonStyles.text, { marginBottom: 16 }]}>
              Ready to get started with the {selectedPackage.name}? 
              Contact our team to begin the onboarding process.
            </Text>
            
            <TouchableOpacity
              style={commonStyles.button}
              onPress={() => {
                setIsBottomSheetVisible(false);
                router.push('/registration');
              }}
            >
              <Text style={commonStyles.buttonText}>Start Registration</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[commonStyles.secondaryButton, { marginTop: 12 }]}
              onPress={() => {
                setIsBottomSheetVisible(false);
                router.push('/contact');
              }}
            >
              <Text style={commonStyles.secondaryButtonText}>Contact Sales</Text>
            </TouchableOpacity>
          </View>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
