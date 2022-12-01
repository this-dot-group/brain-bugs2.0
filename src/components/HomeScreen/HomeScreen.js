import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, Pressable, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import { PixelButton, KeyboardAvoidingComponent, Hider } from '../Shared';

import { Views } from '../../styles/';
import { Typography } from '../../styles/';
import { Images } from '../../styles/';

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
  const [toLobby, setToLobby] = useState(false);
  const [ready, setReady] = useState(false);
  const { width, height } = Dimensions.get('window');  
  const { deviceWidth, newSocket, newSocketId, newFakeOpponent  } = props;

  useEffect(() => {
    // set user device width in global state so we can use for responsive styling in other components
    if(width < 700) deviceWidth("small")
    if(width >= 700 && width <= 900) deviceWidth("medium")
    if(width > 900) deviceWidth("large")
    newSocket(socket)
    // For some reason we need to set the socket id in two different ways
    newSocketId(socket.id)
    newFakeOpponent(fakeOpponentSocket);
    props.newToken();
    setReady(true);
    socket.on('shareId', setSocketId);
    return () => {
      socket.off('shareId', setSocketId)
    }
  }, [])

  const styles = StyleSheet.create({
    // CONTAINER VIEW
    container: {
      ...Views.homeScreenContainer
    },
    logoImg: {
      ...Images.logoImg[props.screenDeviceWidth]
    },
    logoText: {
      ...Typography.headingText[props.screenDeviceWidth]
    },
    // USERNAME INPUT
    input: {
      ...Typography.inputText[props.screenDeviceWidth]
    },
    innerText: {
      ...Typography.innerText[props.screenDeviceWidth]
    },
    // WRAPS LOGO IMG AND TEXT
    logoTextRowView: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
    },
    // WRAPS USERNAME ROW
    inputNestedRowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // WRAPS HOWTOPLAY MODAL ROW
    bottomNestedRowView: {
      flexDirection: 'row',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })

  const setSocketId = id => {
    props.newSocketId(id)
  }

  const handleUsernameChange = (username) => {
    if (username) {
      props.newUsername(username)
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  const handleGo = async () => {
    await props.playSound('flute');
    setToLobby(true)
  }

  if (!ready) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoTextRowView}>
        <Image
          source={require('../../images/BRAIN_BUG1.png')}
          style={styles.logoImg} />
        <Text style={styles.logoText}>BRAIN BUGS</Text> 

        <KeyboardAvoidingComponent
          offset={0}
          style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <View style={styles.inputNestedRowView}>

            <PixelButton buttonStyle={{width: 300, flexDirection: 'row'}}>
              <TextInput
                style={styles.input}
                placeholder={'Enter username'}
                maxLength={15}
                onChangeText={value => handleUsernameChange(value)}
              />
            </PixelButton>

            <PixelButton buttonStyle={{ width: 70, marginLeft: 16, backgroundColor: validUsername ? 'rgba(128,128,128,0)' : 'rgba(128,128,128,0.4)', borderColor: validUsername ? 'black' : 'rgba(128,128,128,0.2)' }}>
              <Pressable onPress={handleGo} disabled={!validUsername}>
                <Text style={styles.innerText}>Go!</Text>
              </Pressable>
            </PixelButton>
          </View>
        </KeyboardAvoidingComponent>
      </View>
      
      <View style={styles.bottomNestedRowView}>
        <PixelButton buttonStyle={{ width: 100}}>
          <Pressable
            onPress={() => {
              props.playSound('click')
              setModalVisible(true);
            }}
            style={{height: '100%', width: '100%'}}
          >
            <Text style={styles.innerText}>How To Play</Text>
          </Pressable>
        </PixelButton>

        <HowToPlayModal
          visible={modalVisible}
          setVisible={setModalVisible}
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
