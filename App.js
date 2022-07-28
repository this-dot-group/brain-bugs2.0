import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native'
import * as Font from 'expo-font'

import store from './src/store/index.js';

import HomeScreen from './src/components/HomeScreen/HomeScreen'
import GameEnd from './src/components/GameEnd/GameEnd'
import GameScreen from './src/components/GameScreen/GameScreen'
import HowToPlay from './src/components/HowToPlay/HowToPlay'
import Lobby from './src/components/Lobby/LobbyScreen'
import WaitingRoom from './src/components/WaitingRoom/WaitingRoom.js'
import WaitingRoom2 from './src/components/WaitingRoom/WaitingRoom2.js'
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen';

import Sounds from './src/sounds/Sounds'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        DotGothic: require('./assets/fonts/DotGothic16_Regular.ttf'),
        VT323: require('./assets/fonts/VT323-Regular.ttf')
      });
      setFontsLoaded(true);
    })()
  }, [])
    

  if (!fontsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <Provider
      store={store}>
      <Sounds />
      <NativeRouter>
        <View style={styles.container}>
          <Route
            exact path='/'
            component={HomeScreen} />
          <Route
            exact path='/lobby'
            component={Lobby} />
          <Route
            exact path='/waitingroom'
            component={WaitingRoom}
          />
          <Route
            exact path='/waitingroom2'
            component={WaitingRoom2}
          />
          <Route
            exact path='/howtoplay'
            component={HowToPlay}
          />
          <Route 
            exact path='/gameplay'
            component={GameScreen}
          />
          <Route 
            exact path='/gameend'
            component={GameEnd}
          />
        </View>
      </NativeRouter>
    </Provider>
  );
  
}




