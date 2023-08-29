import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isIos = Platform.OS === 'ios';

export default function useSafeArea() {
  const { left, right, top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const safeWidth = isIos ? width - left - right : width;
  const safeHeight = isIos ? height - top - bottom : height;
  
  return {
    height: safeHeight,
    width: safeWidth,
    left: left ?? 0,
    right: right ?? 0,
    top: top ?? 0,
    bottom: bottom ?? 0,
  }
} 
