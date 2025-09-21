
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';
import * as ImagePicker from 'expo-image-picker';
import { extractColorsFromImage, updateAppTheme } from '../utils/colorExtractor';

interface LogoUploaderProps {
  onLogoUpdate?: (logoUri: string) => void;
  onColorsExtracted?: (colors: any) => void;
}

export default function LogoUploader({ onLogoUpdate, onColorsExtracted }: LogoUploaderProps) {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pickImage = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const logoUri = result.assets[0].uri;
        setSelectedLogo(logoUri);
        setIsProcessing(true);

        // Extract colors from the logo
        try {
          const extractedColors = await extractColorsFromImage(logoUri);
          
          // Update app theme
          updateAppTheme(extractedColors);
          
          // Notify parent components
          onLogoUpdate?.(logoUri);
          onColorsExtracted?.(extractedColors);
          
          Alert.alert('Success', 'Logo uploaded and colors extracted successfully!');
        } catch (error) {
          console.log('Error extracting colors:', error);
          Alert.alert('Error', 'Failed to extract colors from logo');
        } finally {
          setIsProcessing(false);
        }
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Logo</Text>
      <Text style={styles.description}>
        Upload your restaurant logo to customize the app&apos;s color scheme
      </Text>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickImage}
        disabled={isProcessing}
      >
        {selectedLogo ? (
          <Image source={{ uri: selectedLogo }} style={styles.previewImage} />
        ) : (
          <View style={styles.uploadContent}>
            <Icon name="cloud-upload-outline" size={40} color={colors.primary} />
            <Text style={styles.uploadText}>Tap to upload logo</Text>
          </View>
        )}
      </TouchableOpacity>

      {isProcessing && (
        <Text style={styles.processingText}>Processing logo and extracting colors...</Text>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>What happens next?</Text>
        <Text style={styles.infoText}>
          • Your logo will be integrated into the app header and onboarding screens
        </Text>
        <Text style={styles.infoText}>
          • We&apos;ll extract the primary colors from your logo
        </Text>
        <Text style={styles.infoText}>
          • The app&apos;s color scheme will be updated to match your brand
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 150,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 12,
    fontWeight: '600',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  processingText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  infoContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
});
