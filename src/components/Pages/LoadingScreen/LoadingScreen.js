import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '../../Shared';
import { darkBackground } from '../../../styles/colors';


const styles = StyleSheet.create({
  container: {
    backgroundColor: darkBackground.hex,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
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




