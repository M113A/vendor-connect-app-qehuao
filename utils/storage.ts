
import { Platform } from 'react-native';

// Simple storage utility for web (localStorage) and mobile (AsyncStorage would be used in real app)
class Storage {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      // In a real app, you would use AsyncStorage here
      console.log(`Storing ${key}: ${value}`);
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      // In a real app, you would use AsyncStorage here
      console.log(`Getting ${key}`);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      // In a real app, you would use AsyncStorage here
      console.log(`Removing ${key}`);
    }
  }
}

export const storage = new Storage();

// Keys for storing data
export const STORAGE_KEYS = {
  REGISTRATION_DRAFT: 'registration_draft',
  USER_PREFERENCES: 'user_preferences',
  TRACKING_HISTORY: 'tracking_history',
};
