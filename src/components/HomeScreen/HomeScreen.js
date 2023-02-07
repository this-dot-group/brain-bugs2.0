import React, { useEffect, useState, useRef } from 'react'
import { View, TextInput, StyleSheet, Modal, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import AnimatedLogo from './AnimatedLogo';
import { PixelButton, KeyboardAvoidingComponent, PixelPressable } from '../Shared';

import { Buttons, Views, Typography, Images } from '../../styles/';

import { newSocket } from '../../store/socketReducer.js';
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer';
import { playSound } from '../../store/soundsReducer';
import { newUsername, newGameCode, newSocketId, newToken, deviceWidth } from '../../store/userReducer.js';

import { EXPO_LOCAL_URL } from '../../../env'

const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

function Homescreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [validUsername, setValidUsername] = useState(false);
  const [username, setUsername] = useState('')
  const [toLobby, setToLobby] = useState(false);
  const [ready, setReady] = useState(false);
  const { width, height } = Dimensions.get('window');  
  const { 
    deviceWidth, 
    newSocket, 
    newSocketId, 
    newFakeOpponent, 
    newToken, 
    newUsername, 
    screenDeviceWidth, 
    playSound 
  } = props;


  const getUsername = async () => {
    try {
      const localUsername = await AsyncStorage.getItem('username')
      if (localUsername !== null) {
        newUsername(localUsername);
        setValidUsername(true);
        setUsername(localUsername);
      }
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // set user device width in global state so we can use for responsive styling in other components
    if(width < 700) deviceWidth("small")
    if(width >= 700 && width <= 900) deviceWidth("medium")
    if(width > 900) deviceWidth("large")
    newSocket(socket)
    // For some reason we need to set the socket id in two different ways
    newSocketId(socket.id)
    newFakeOpponent(fakeOpponentSocket);
    newToken();
    setReady(true);
    socket.on('shareId', setSocketId);
    getUsername()
    return () => {
      socket.off('shareId', setSocketId)
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      ...Views.homeScreenContainer
    },
    logoImg: {
      ...Images.logoImg[screenDeviceWidth]
    },
    logoText: {
      ...Typography.headingOneText[screenDeviceWidth]
    },
    // username input
    input: {
      ...Typography.inputText[screenDeviceWidth]
    },
    howToPlayBtn: {
      ...Buttons.howToPlayBtn[screenDeviceWidth]
    },
    goBtn: {

    },
    logoTextRowView: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
    },
    // wraps username row
    inputNestedRowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // wraps how to play modal row
    bottomNestedRowView: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })

  const setSocketId = id => {
    newSocketId(id)
  }

  const handleUsernameChange = (username) => {
    setUsername(username)
    if (username) {
      newUsername(username)
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  const handleGo = async () => {
    await playSound('flute');
    setToLobby(true)
  }

  console.log('HomeScreen screenWidth: ', screenDeviceWidth)

  if (!ready) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoTextRowView}>
        <AnimatedLogo
          imgStyle={styles.logoImg}
          textStyle={styles.logoText}
        />
        <KeyboardAvoidingComponent
          offset={0}
          style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <View style={styles.inputNestedRowView}>

            <PixelButton buttonStyle={{width: 300, height: 46, flexDirection: 'row'}}>
              <TextInput
                style={styles.input}
                placeholder={'Enter username'}
                maxLength={15}
                onChangeText={value => handleUsernameChange(value)}
                value={username}
              />
            </PixelButton>

            <PixelPressable
              buttonStyle={{
                width: 70,
                height: 46,
                marginLeft: 16,
                backgroundColor: validUsername ? 'rgba(128,128,128,0)' : 'rgba(128,128,128,0.4)',
                borderColor: validUsername ? 'black' : 'rgba(128,128,128,0.2)',
              }}
              pressableProps={{
                onPress: handleGo,
                disabled: !validUsername,
              }}
            >Go!</PixelPressable>
          </View>
        </KeyboardAvoidingComponent>
      </View>
      
      <View style={styles.bottomNestedRowView}>
        <PixelPressable
          buttonStyle={styles.howToPlayBtn}
          pressableProps={{
            onPress: () => {
              playSound('click')
              setModalVisible(true);
            }
          }}
        >How To Play</PixelPressable>

        <HowToPlayModal
          visible={modalVisible}
          setVisible={setModalVisible}
          deviceSize={screenDeviceWidth}
        />

        <View>
          <MuteButton/>
        </View>
     
      </View>

      {toLobby && <Redirect to='/lobby' />}
      
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { newUsername, newSocket, newGameCode, newFakeOpponent, playSound, newSocketId, newToken, deviceWidth }

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
