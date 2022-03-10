import React from 'react';
import { Image } from 'react-native';

function LoadingScreen() {
  return (
    <Image
      source={require('../../images/win95_hourglass.gif')}
      style={{ height: 30, width: 30 }}
    />
  )
}

export default LoadingScreen;




