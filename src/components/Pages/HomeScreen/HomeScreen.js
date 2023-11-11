import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import AnimatedLogo from './AnimatedLogo.js';
import SettingsDrawer from '../../Shared/SettingsDrawer/SettingsDrawer.js';
import AnimatedView from '../../Shared/AnimatedView.js';
import { PixelButton, KeyboardAvoidingComponent, PixelPressable } from '../../Shared/index.js';
import Overlay from '../../Shared/Overlay.js'
import CrawlingBugs from '../../Shared/CrawlingBugs/CrawlingBugs.js';

import { Views, Typography, Images } from '../../../styles/index.js';

import { useKeyboard } from '../../../hooks/index.js';

import { newSocket } from '../../../store/socketReducer.js';
import { newFakeOpponent } from '../../../store/fakeOpponentSocketReducer.js';
import { playSound } from '../../../store/soundsReducer.js';
import { newUsername, newGameCode, newSocketId, newToken, deviceWidth } from '../../../store/userReducer.js';

import { EXPO_LOCAL_URL } from '../../../../env.js'
import { brightGreen, darkBackground, yellow } from '../../../styles/colors.js';

const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

function Homescreen(props) {
  const { 
    deviceWidth, 
    newSocket, 
    newSocketId, 
    newFakeOpponent, 
    newToken, 
    newUsername, 
    screenDeviceWidth, 
    playSound,
    username,
  } = props;

  const [validUsername, setValidUsername] = useState(!!username);
  const [formUsername, setFormUsername] = useState(username || '')
  const [toLobby, setToLobby] = useState(false);
  const [ready, setReady] = useState(false);
  const { width, height } = Dimensions.get('window');  

  const { keyboardActive, hideKeyboard } = useKeyboard();

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
      ...Typography.inputText[screenDeviceWidth],
      backgroundColor: darkBackground.hex
    },
    logoTextRowView: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
      zIndex: 2,
    },
    // wraps username row
    inputNestedRowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  const setSocketId = id => {
    newSocketId(id)
  }

  const handleUsernameChange = (username) => {
    setFormUsername(username);
    setValidUsername(!!username);
  }

  const handleGo = async () => {
    newUsername(formUsername);
    await playSound('flute');
    setToLobby(true)
  }

  const handleSubmit = () => {
    if (!validUsername) return;
    handleGo();
  }

  console.log('HomeScreen screenWidth: ', screenDeviceWidth)

  if (!ready) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <AnimatedView style={styles.container} useSite="HomeScreen">
      <CrawlingBugs num={8} />
      <Overlay
        active={keyboardActive}
        onPress={hideKeyboard}
      />
      <View style={styles.logoTextRowView}>
        <AnimatedLogo
          imgStyle={styles.logoImg}
          textStyle={styles.logoText}
        />
        <KeyboardAvoidingComponent
          offset={80}
          style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <View style={styles.inputNestedRowView}>

            <PixelButton buttonStyle={{width: 300, height: 46, flexDirection: 'row'}}>
              <TextInput
                style={styles.input}
                placeholder={'Enter username'}
                placeholderTextColor={yellow.hex}
                maxLength={15}
                onChangeText={value => handleUsernameChange(value)}
                value={formUsername}
                returnKeyType={'go'}
                onSubmitEditing={handleSubmit}
              />
            </PixelButton>

            <PixelPressable
              buttonStyle={{
                width: 70,
                height: 46,
                marginLeft: 16,
                backgroundColor: validUsername ? darkBackground.hex : 'rgba(128,128,128,0.4)',
                borderColor: validUsername ? brightGreen.hex : 'rgba(128,128,128,0.2)',
              }}
              pressableProps={{
                onPress: handleGo,
                disabled: !validUsername,
              }}
            >
              Go!
            </PixelPressable>
          </View>
        </KeyboardAvoidingComponent>
      </View>

      {toLobby && <Redirect to='/lobby' />}
      <SettingsDrawer />
      
    </AnimatedView>
  )
}

const mapStateToProps = (state) => {
  return {
    screenDeviceWidth: state.userReducer.deviceWidth,
    username: state.username
  }
}

const mapDispatchToProps = { newUsername, newSocket, newGameCode, newFakeOpponent, playSound, newSocketId, newToken, deviceWidth }

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
