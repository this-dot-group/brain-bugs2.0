import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Hider from './Hider';
import { useSafeArea } from '../../hooks';

export default function Overlay ({
  active,
  backgroundColor = 'rgba(0,0,0,.5)',
  onPress,
  style,
}) {
  const { width, height } = useSafeArea()
  const styles = StyleSheet.create({
    overlay: {
      width,
      height,
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