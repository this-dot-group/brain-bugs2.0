import React from 'react';
import { StyleSheet } from 'react-native';
import { Hider } from '../Shared';

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    zIndex: 1,
  },
});

export default function Overlay ({ active }) {
  return (
    <Hider
      show={active}
      style={styles.overlay}
      pointerEvents='none'
    />
  )
}