import React, { useEffect, useRef, } from 'react';
import { Animated } from 'react-native';

function Hider(props) {
  const { children, show, style = {}, minOpacity = 0, maxOpacity = 1 } = props
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: show ? maxOpacity : minOpacity,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [show])

  return (
    <Animated.View
      pointerEvents={show ? 'auto' : 'none'}
      {...props}
      style={{...style, opacity: fadeAnim }}
    >
      {children}
    </Animated.View>
  )
}

export default Hider;