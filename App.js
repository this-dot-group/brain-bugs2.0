import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Link } from 'react-router-native'
// import { Notifications } from "expo";
import * as Notifications from 'expo-notifications';

import store from './src/store/index.js';

import HomeScreen from './src/components/HomeScreen/HomeScreen'
import GameEnd from './src/components/GameEnd/GameEnd'
import GameScreen from './src/components/GameScreen/GameScreen'
import HowToPlay from './src/components/HowToPlay/HowToPlay'
import Lobby from './src/components/Lobby/LobbyScreen'
import WaitingRoom from './src/components/WaitingRoom/WaitingRoom.js'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    // shouldSetBadge: false,
  }),
});


export default function App() {

  //TODO: not getting to any of this stuff, is it because its in a dif place than the actual push notification registrations? cant put it here tho because then everyone will have the push token, not just the gamemaker. 

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    console.log('NOTIFICATION:', notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('RESPONSE: ', response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };

  }, []);


  return (

    <Provider
      store={store}>
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

{/* <GameScreen />
        <GameEnd />
        <HowToPlay />         
      <Text>Brain Bugs 2.0 - Coming Soon!</Text> */}
{/* <StatusBar style="auto" /> */ }



