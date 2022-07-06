import React, { useEffect, useRef, } from 'react';
import { Animated } from 'react-native';

function Hider({ children, show }) {
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
      style={{opacity: fadeAnim}}
    >
      {children}
    </Animated.View>
  )
}

export default Hider;