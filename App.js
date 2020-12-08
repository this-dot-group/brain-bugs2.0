import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store/index.js';

import HomeScreen from './src/components/HomeScreen/HomeScreen'
import GameEnd from './src/components/GameEnd/GameEnd'
import GameScreen from './src/components/GameScreen/GameScreen'
import HowToPlay from './src/components/HowToPlay/HowToPlay'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function App() {
  return (
    <Provider
      store={store}>

      <View style={styles.container}>

        <HomeScreen />

        {/* <GameScreen />
        <GameEnd />
        <HowToPlay />         
      <Text>Brain Bugs 2.0 - Coming Soon!</Text> */}
        {/* <StatusBar style="auto" /> */}

      </View>

    </Provider>
  );
}



