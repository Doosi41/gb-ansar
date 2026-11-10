import { Platform, useWindowDimensions } from 'react-native';

export const SIDEBAR_WIDTH = 248;
const DESKTOP_MIN_WIDTH = 1024;

/** Десктопная раскладка включается только в браузере на широком окне. */
export function useLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width >= DESKTOP_MIN_WIDTH;
  return { isDesktop, width, contentWidth: isDesktop ? width - SIDEBAR_WIDTH : width };
}
