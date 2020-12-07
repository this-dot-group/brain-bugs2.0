import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GameEnd from './components/GameEnd/GameEnd'
import GameScreen from './components/GameScreen/GameScreen'
import HomeScreen from './components/HomeScreen/HomeScreen'
import HowToPlay from './components/HowToPlay/HowToPlay'

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      {/* <GameScreen />
      <GameEnd />
      <HowToPlay />         
      <Text>Brain Bugs 2.0 - Coming Soon!</Text> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
