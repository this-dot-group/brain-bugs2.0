import React, { useEffect, useRef, } from 'react';
import { Animated } from 'react-native';

function Hider({ children, show, style = {} }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: show ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [show])

  return (
    <Animated.View
      pointerEvents={show ? 'auto' : 'none'}
      style={{...style, opacity: fadeAnim }}
    >
      {children}
    </Animated.View>
  )
}

export default Hider;