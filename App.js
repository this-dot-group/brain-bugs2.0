import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { NativeRouter, Route } from 'react-router-native'
import * as Font from 'expo-font'
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import store, { persistor } from './src/store/index.js';

import HomeScreen from './src/components/HomeScreen/HomeScreen'
import GameEnd from './src/components/GameEnd/GameEnd'
import GameScreen from './src/components/GameScreen/GameScreen'
import HowToPlay from './src/components/HowToPlay/HowToPlay'
import Lobby from './src/components/Lobby/LobbyScreen'
import WaitingRoom from './src/components/WaitingRoom/WaitingRoom.js'
import LoadingScreen from './src/components/LoadingScreen/LoadingScreen';
import RootErrorBoundary from './src/components/ErrorBoundary/RootErrorBoundary';
import { SafeViewAllDevices } from './src/components/Shared';

import { Views } from './src/styles/index.js';

import Sounds from './src/sounds/Sounds'

const styles = StyleSheet.create({
  container: Views.safeAreaContainer,
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const setOrientation = async () => {
    await lockAsync(OrientationLock.LANDSCAPE);
  }

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        DotGothic: require('./assets/fonts/DotGothic16_Regular.ttf'),
        VT323: require('./assets/fonts/VT323-Regular.ttf')
      });
      setFontsLoaded(true);
      setOrientation();
    })()
  }, [])

  if (!fontsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <RootErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LoadingScreen/>}>
          <Sounds />
          <NativeRouter>
            <SafeAreaProvider>
              <SafeViewAllDevices style={styles.container}>
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
              </SafeViewAllDevices>
            </SafeAreaProvider>
          </NativeRouter>
        </PersistGate>
      </Provider>
    </RootErrorBoundary>
  );
  
}