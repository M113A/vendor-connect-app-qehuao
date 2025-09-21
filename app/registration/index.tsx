
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import Icon from '../../components/Icon';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { validateRegistrationForm, ValidationResult } from '../../utils/validation';
import { storage, STORAGE_KEYS } from '../../utils/storage';

interface RestaurantData {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string;
  description: string;
}

export default function RegistrationScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RestaurantData>({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    cuisine: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // Load saved draft on component mount
  useEffect(() => {
    loadDraft();
  }, []);

  // Save draft whenever form data changes
  useEffect(() => {
    saveDraft();
  }, [formData]);

  const loadDraft = async () => {
    try {
      const draft = await storage.getItem(STORAGE_KEYS.REGISTRATION_DRAFT);
      if (draft) {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
        console.log('Loaded registration draft');
      }
    } catch (error) {
      console.log('Error loading draft:', error);
    }
  };

  const saveDraft = async () => {
    try {
      await storage.setItem(STORAGE_KEYS.REGISTRATION_DRAFT, JSON.stringify(formData));
    } catch (error) {
      console.log('Error saving draft:', error);
    }
  };

  const clearDraft = async () => {
    try {
      await storage.removeItem(STORAGE_KEYS.REGISTRATION_DRAFT);
    } catch (error) {
      console.log('Error clearing draft:', error);
    }
  };

  const updateFormData = (field: keyof RestaurantData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors: { [key: string]: string } = {};
    
    if (currentStep === 1) {
      if (!formData.restaurantName.trim()) stepErrors.restaurantName = 'Restaurant name is required';
      if (!formData.ownerName.trim()) stepErrors.ownerName = 'Owner name is required';
      if (!formData.email.trim()) stepErrors.email = 'Email is required';
      if (!formData.phone.trim()) stepErrors.phone = 'Phone number is required';
    } else if (currentStep === 2) {
      if (!formData.address.trim()) stepErrors.address = 'Address is required';
      if (!formData.cuisine.trim()) stepErrors.cuisine = 'Cuisine type is required';
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    const validation = validateRegistrationForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration submitted:', formData);
      
      // Clear the draft after successful submission
      await clearDraft();
      
      Alert.alert(
        'Registration Submitted!',
        'Your application has been submitted successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'Track Application',
            onPress: () => router.push('/tracking'),
          },
          {
            text: 'Go Home',
            onPress: () => router.push('/'),
          },
        ]
      );
    } catch (error) {
      console.log('Submission error:', error);
      Alert.alert('Error', 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: index + 1 <= currentStep ? colors.primary : colors.grey,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 8,
          }}
        >
          <Text style={{
            color: index + 1 <= currentStep ? colors.background : colors.text,
            fontWeight: '600',
          }}>
            {index + 1}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 24 }]}>
        Basic Information
      </Text>
      
      <FormInput
        label="Restaurant Name"
        placeholder="Enter your restaurant name"
        value={formData.restaurantName}
        onChangeText={(text) => updateFormData('restaurantName', text)}
        error={errors.restaurantName}
        required
      />
      
      <FormInput
        label="Owner/Manager Name"
        placeholder="Enter owner or manager name"
        value={formData.ownerName}
        onChangeText={(text) => updateFormData('ownerName', text)}
        error={errors.ownerName}
        required
      />
      
      <FormInput
        label="Email Address"
        placeholder="Enter email address"
        value={formData.email}
        onChangeText={(text) => updateFormData('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        required
      />
      
      <FormInput
        label="Phone Number"
        placeholder="Enter phone number"
        value={formData.phone}
        onChangeText={(text) => updateFormData('phone', text)}
        keyboardType="phone-pad"
        error={errors.phone}
        required
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 24 }]}>
        Restaurant Details
      </Text>
      
      <FormInput
        label="Restaurant Address"
        placeholder="Enter complete address"
        value={formData.address}
        onChangeText={(text) => updateFormData('address', text)}
        multiline
        error={errors.address}
        required
      />
      
      <FormInput
        label="Cuisine Type"
        placeholder="e.g., Italian, Chinese, Fast Food"
        value={formData.cuisine}
        onChangeText={(text) => updateFormData('cuisine', text)}
        error={errors.cuisine}
        required
      />
      
      <FormInput
        label="Restaurant Description"
        placeholder="Brief description of your restaurant (optional)"
        value={formData.description}
        onChangeText={(text) => updateFormData('description', text)}
        multiline
        numberOfLines={4}
        style={{ height: 100, textAlignVertical: 'top' }}
      />
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={[commonStyles.subtitle, { textAlign: 'center', marginBottom: 24 }]}>
        Review & Submit
      </Text>
      
      <View style={commonStyles.card}>
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Restaurant Name:</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{formData.restaurantName}</Text>
        
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Owner:</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{formData.ownerName}</Text>
        
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Contact:</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>{formData.email}</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{formData.phone}</Text>
        
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Address:</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{formData.address}</Text>
        
        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>Cuisine:</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{formData.cuisine}</Text>
      </View>
      
      <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 16 }]}>
        By submitting, you agree to our terms and conditions.
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { paddingTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={handleBack} style={{ marginRight: 16 }}>
              <Icon name="arrow-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={commonStyles.title}>Restaurant Registration</Text>
          </View>
          
          {renderStepIndicator()}
        </View>

        {/* Form Content */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={commonStyles.section}>
            {renderCurrentStep()}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={[commonStyles.section, { paddingBottom: 20 }]}>
          <Button
            text={currentStep === totalSteps ? 'Submit Application' : 'Next'}
            onPress={handleNext}
            disabled={isSubmitting}
          />
          {currentStep > 1 && (
            <Button
              text="Previous"
              onPress={handleBack}
              variant="secondary"
              style={{ marginTop: 12 }}
              disabled={isSubmitting}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
