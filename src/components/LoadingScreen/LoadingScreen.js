import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '../Shared';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
});

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  )
}

export default LoadingScreen;




