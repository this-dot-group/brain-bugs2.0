import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// modular styles
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import { PixelButton, KeyboardAvoidingComponent, Hider } from '../Shared';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Views } from '../../styles/';
import { newSocket } from '../../store/socketReducer.js';
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer';
import { playSound } from '../../store/soundsReducer';
import { newUsername, newGameCode, newSocketId, newToken } from '../../store/userReducer.js';
import { EXPO_LOCAL_URL } from '../../../env'


const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);


const styles = StyleSheet.create({
  // CONTAINER VIEW
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // BIG IMAGE
  logoImg: {
    width: scale(100),
    height: scale(100),
  },
  // NAME TEXT
  logoText:{
    fontFamily: 'DotGothic',
    fontSize: scale(54)
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
    justifyContent: 'space-between'
  },

  // USERNAME INPUT
  input: {
    height: '100%',
    flex: 1,
    fontFamily: 'DotGothic',
    fontSize: scale(16),
    paddingLeft: 8,
    flexDirection: 'row',
    paddingRight: 0
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: scale(14),
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  },
  modalView: {
    ...Views.modalView,
  }
})

function Homescreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [validUsername, setValidUsername] = useState(false);
  const [username, setUsername] = useState('')
  const [toLobby, setToLobby] = useState(false);


  const getUsername = async () => {
    try {
      const localUsername = await AsyncStorage.getItem('username')
      if (localUsername !== null) {
        props.newUsername(localUsername);
        setValidUsername(true);
        setUsername(localUsername);
      }
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    props.newSocket(socket)
    // For some reason we need to set the socket id in two different ways
    props.newSocketId(socket.id)
    props.newFakeOpponent(fakeOpponentSocket);
    props.newToken();
    socket.on('shareId', setSocketId);

    getUsername()

    return () => {
      socket.off('shareId', setSocketId)
    }
  }, [])

  const setSocketId = id => {
    props.newSocketId(id)
  }

  const handleUsernameChange = (username) => {
    setUsername(username)

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
            value={username}
          />
        </PixelButton>

        {/* <Hider
          show={validUsername}
          style={{ transform: [{translateX: 8 }], zIndex: 1, position: 'relative' }}
        > */}
          <PixelButton buttonStyle={{ width: scale(70), marginLeft: scale(10), backgroundColor: validUsername ? 'rgba(128,128,128,0)' : 'rgba(128,128,128,0.4)', borderColor: validUsername ? 'black' : 'rgba(128,128,128,0.2)' }}>
            <Pressable onPress={handleGo} disabled={!validUsername}>
              <Text style={styles.innerText}>Go!</Text>
            </Pressable>
          </PixelButton>
        {/* </Hider> */}
      </View>
      </KeyboardAvoidingComponent>

      <View style={styles.bottomNestedRowView}>
        <PixelButton buttonStyle={{width: scale(120)}}>
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

        <View style={styles.muteIconWrapper}>
          <MuteButton/>
        </View>
     
      </View>

      

      {toLobby && <Redirect to='/lobby' />}

      
    </View>
  )
}

const mapDispatchToProps = { newUsername, newSocket, newGameCode, newFakeOpponent, playSound, newSocketId, newToken }


// null is currently a placeholder for mapStateToProps

export default connect(null, mapDispatchToProps)(Homescreen);
