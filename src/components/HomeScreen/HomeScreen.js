import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, Pressable, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import { PixelButton, KeyboardAvoidingComponent, Hider } from '../Shared';
import { Views } from '../../styles/';
import { newSocket } from '../../store/socketReducer.js';
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer';
import { playSound } from '../../store/soundsReducer';
import { newUsername, newGameCode, newSocketId, newToken, deviceWidth } from '../../store/userReducer.js';
import { EXPO_LOCAL_URL } from '../../../env'


const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);


const styles = StyleSheet.create({
  // CONTAINER VIEW
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // BIG IMAGE
  logoImg: {
    width: 100,
    height: 100,
  },
  // NAME TEXT
  logoText:{
    fontFamily: 'DotGothic',
    fontSize: 54,
    margin: 10
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

  // USERNAME INPUT
  input: {
    height: '100%',
    flex: 1,
    fontFamily: 'DotGothic',
    fontSize: 14,
    paddingLeft: 8,
    flexDirection: 'row',
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  }
})

function Homescreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [validUsername, setValidUsername] = useState(false);
  const [toLobby, setToLobby] = useState(false);
  const { width, height } = Dimensions.get('window');
  console.log('width in App:', width)
  console.log('height in App:', height)

    // width - 667
  // height - 375
  // (recognized its in landscape mode)
  // TODO: width / fontSize = ratioNum
  // How to Play btn on HomeScreen: 667 / 14 = 47.64 (how to play and go btns, input placeholder innerText)
  // Brain Bugs on HomeScreen: 667 / 54 = 12.35 (big logoText)
  // Welcome greeting on LobbyScreen 667 / 54 = 12.35 (big heading text)
  // LobbyScreen dropdown inner text 667 / 16 = 41.69 (dropdown inputs)

  useEffect(() => {
    console.log("1 deviceWidth:", props.screenDeviceWidth)
    // set user device width in state so we can use for responsive font sizing
    props.deviceWidth(width)
    props.newSocket(socket)
    // For some reason we need to set the socket id in two different ways
    props.newSocketId(socket.id)
    props.newFakeOpponent(fakeOpponentSocket);
    props.newToken();
    console.log("2 deviceWidth:", props.screenDeviceWidth)

    socket.on('shareId', setSocketId);

    return () => {
      socket.off('shareId', setSocketId)
    }
  }, [])

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

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../../images/BRAIN_BUG1.png')}
        style={styles.logoImg} />
      
      <Text style={styles.logoText}>BRAIN BUGS</Text>  

    <KeyboardAvoidingComponent
      offset={0}
      style={{ backgroundColor: 'transparent' }}
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
