import {Platform, Dimensions, StatusBar, PixelRatio} from 'react-native';

export const IsIOS = Platform.OS === 'ios';
export const IsAndroid = Platform.OS === 'android';

export const MajorOSVersion = IsIOS ? parseInt(Platform.Version.toString(), 10) : Platform.Version;

export const getFontScale = (): number => Dimensions.get('window').fontScale;

export const StatusBarHeight = IsIOS ? 0 : StatusBar.currentHeight || 0;

/**
 * A custom keyboardType that will only have numeric values in the keyboard
 * for both Android and IOS platforms.
 */
export const OnlyNumericPad = IsIOS ? 'number-pad' : 'numeric';

export const randomizeState = (stateArr: Float32Array): Float32Array => {
  return stateArr.map(() => Math.random());
};

export const softMax = (input: number[]) => {
  const C = Math.max(...input);

  const d = input.map((y) => Math.exp(y - C)).reduce((a, b) => a + b);

  return input.map((value) => {
    return Math.exp(value - C) / d;
  });
};

// https://github.com/facebook/react-native/issues/29010#issuecomment-636653305
export const DpiSafeSize = (size: number) => {
  const dpi = PixelRatio.get();
  const px = size * dpi;
  const intPx = Math.round(px);
  const diff = intPx - px;
  return size + diff / dpi;
};

export const DateWithTime = (date: Date = new Date()) => {
  return date.toISOString().replace('T', '_').replace('Z', '').split('.')[0].replace(/:/g, '-');
};
