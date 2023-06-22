import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Hider from './Hider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Overlay ({
  active,
  backgroundColor = 'rgba(0,0,0,.5)',
  onPress,
  style,
}) {
  const { width, height } = useWindowDimensions()
  const { left, right, top, bottom } = useSafeAreaInsets() 
  const styles = StyleSheet.create({
    overlay: {
      width: width + left + right,
      height: height + top + bottom,
      backgroundColor,
      position: 'absolute',
      zIndex: 2,
      left: 0,
      top: 0,
    },
    pressable: {
      width: '100%',
      height: '100%',
    }
  });

  return (
    <Hider
      show={active}
      style={{
        ...styles.overlay,
        ...style
      }}
    >
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        pointerEvents="auto"
      />
    </Hider>
  )
}