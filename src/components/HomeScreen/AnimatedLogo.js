import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import logo from '../../images/BRAIN_BUG1.png';

function AnimatedLogo ({ imgStyle }) {
  const scaleAnim = useRef(new Animated.Value(1.8)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: .5,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Image
      style={{
        ...imgStyle,
        transform: [
          {
            scale: scaleAnim
          }
        ]
      }}
      source={logo}
    />
  )
}

export default AnimatedLogo;