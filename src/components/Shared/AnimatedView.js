import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  }
});

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
        ...styles.root,
        ...style,
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  );
}

export default AnimatedView;

