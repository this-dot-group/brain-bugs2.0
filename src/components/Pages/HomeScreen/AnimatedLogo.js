import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import logo from '../../../images/BRAIN_BUG2.png';

function AnimatedLogo ({ imgStyle, textStyle }) {
  const scaleAnim = useRef(new Animated.Value(1.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: .5,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <Animated.Image
        style={{
          ...imgStyle,
          transform: [
            {
              scale: scaleAnim
            },
          ]
        }}
        source={logo}
      />
      <Animated.Text style={{
        ...textStyle,
        opacity: fadeAnim,
      }}>
          BRAIN BUGS 
      </Animated.Text>
    </>
  )
}

export default AnimatedLogo;