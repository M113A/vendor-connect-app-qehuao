
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B5CF6',    // Purple - primary brand color
  secondary: '#10B981',  // Green - secondary brand color  
  accent: '#FFFFFF',     // White - third color
  background: '#FFFFFF', // White background for light theme
  backgroundAlt: '#F8F9FA', // Light grey background
  text: '#2C3E50',       // Dark text for readability
  textSecondary: '#7F8C8D', // Secondary text color
  grey: '#BDC3C7',       // Light grey
  card: '#FFFFFF',       // White card background
  success: '#10B981',    // Green for success states (using secondary color)
  warning: '#F59E0B',    // Orange for warnings
  error: '#EF4444',      // Red for errors
  border: '#E1E8ED',     // Light border color
  
  // Dark theme colors (for future dark mode implementation)
  darkBackground: '#1F2937',
  darkBackgroundAlt: '#374151',
  darkText: '#F9FAFB',
  darkTextSecondary: '#D1D5DB',
  darkCard: '#374151',
  darkBorder: '#4B5563',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
