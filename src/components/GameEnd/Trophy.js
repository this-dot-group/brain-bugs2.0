import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

const SIZE = 50;

const styles = StyleSheet.create({
  container: {
    height: SIZE,
    width: SIZE,
  },
  trophy: {
    height: SIZE,
    width: SIZE,
    position: 'absolute',
    bottom: 0
  },
})

export default function Trophy() {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(shakeAnim, {
      toValue: 1,
      duration: 1600,
      easing: Easing.linear,
      useNativeDriver: true,
    })).start();
  }, [])

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {
            rotateZ: shakeAnim.interpolate({
              inputRange: [0, .6, .7, .8, .85, .9, .94, .98, 1],
              outputRange: ['0deg', '0deg', '10deg', '-10deg', '10deg', '-10deg', '10deg', '-10deg','0deg']
            }),
          },
        ]
      }}
    >
      <Image
        source={require('../../../assets/trophy.png')}
        style={styles.trophy}
      />
    </Animated.View>
  )
}