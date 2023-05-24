import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

const AnimatedView = (props) => {
  const { children, style = {} } = props
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  );
}

export default AnimatedView;

