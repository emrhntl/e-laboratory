import EncryptedStorage from 'react-native-encrypted-storage';
import Logger from './Logger';

export const setSecureItem = async (key: string, value: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    Logger.error(`Failed to store item with key: ${key}`, error);
    throw error;
  }
};

export const getSecureItem = async (key: string): Promise<string | null> => {
  try {
    const item = await EncryptedStorage.getItem(key);
    return item || null;
  } catch (error) {
    Logger.error(`Failed to retrieve item with key: ${key}`, error);
    throw error;
  }
};

export const removeSecureItem = async (key: string): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    Logger.error(`Failed to remove item with key: ${key}`, error);
    throw error;
  }
};
