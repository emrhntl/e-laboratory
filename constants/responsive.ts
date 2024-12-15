import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Ekran genişliğine göre ölçekleme
export const scale = (size: number): number => (SCREEN_WIDTH / 375) * size;

// Ekran yüksekliğine göre ölçekleme
export const verticalScale = (size: number): number => (SCREEN_HEIGHT / 812) * size;

// Daha iyi bir ölçekleme kontrolü
export const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

// Pixel yoğunluğuna göre yazı tipi boyutlandırma
export const fontScale = (size: number): number => {
  const scaleValue = PixelRatio.getFontScale();
  return size * scaleValue;
};

// Platform bazlı stil (iOS/Android)
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
