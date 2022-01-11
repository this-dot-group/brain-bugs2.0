import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { Image, Input } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';

// modular styles
import { Buttons, Images, Views, Typography, Colors } from '../../styles/'

// socket imports
import { newSocket } from '../../store/socketReducer.js';
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer';
import { playSound } from '../../store/soundsReducer';

import { newUsername, newGameCode, newSocketId, newToken } from '../../store/userReducer.js';
import { EXPO_LOCAL_URL } from '../../../env'



const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

// construct styles here, ability to add indv styling as needed on a per-component basis
const styles = StyleSheet.create({
  container: {
    ...Views.viewContainer,
  },
  howToPlayModalButton: {
    ...Buttons.openButton,
    backgroundColor: Colors.orange.hex,
    position: 'absolute',
    bottom: 50
  },
  goButton: {
    ...Buttons.openButton,
    backgroundColor: Colors.red.hex,
    minWidth: '90%',
    alignItems: 'center'
  },
  logoImg: {
    ...Images.logoImg,
  },
  modalView: {
    ...Views.modalView,
  },
  input: {
    ...Typography.input,
  }
})

function Homescreen(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [validUsername, setValidUsername] = useState(false);
  const [toLobby, setToLobby] = useState(false);

  useEffect(() => {
    props.newSocket(socket)
    props.newFakeOpponent(fakeOpponentSocket);
    socket.on('shareId', setSocketId)
    props.newToken();

    return () => socket.off('shareId', setSocketId)

  }, [])

  const setSocketId = id => {
    console.log('in setSocketID', id)
    props.newSocketId(id);
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

      <Pressable
        style={styles.howToPlayModalButton}
        onPress={() => {
          props.playSound('click')
          setModalVisible(true);
        }}
      >
        <Text>How To Play</Text>
      </Pressable>
      <MuteButton />
      
      <Image
        source={require('../../images/logo_option.png')}
        style={styles.logoImg} />
      <Text>Welcome to This Game</Text>


      <Text>Please enter your name to display here:</Text>

      <Input
        placeholder={'username'}
        style={styles.input}
        onChangeText={value => handleUsernameChange(value)}
      />

      {validUsername &&
        <Pressable style={styles.goButton} onPress={handleGo}>
          <Text>Go!</Text>
        </Pressable>

      }

      {toLobby && <Redirect to='/lobby' />}



      {/* how to play component wrapped in Modal here, can think about moving some of this to HowToPlayModal.js component */}

      <Modal
        transparent={true}
        visible={modalVisible}
        supportedOrientations={['landscape']}
        >

        <View
          style={styles.modalView}>
          <HowToPlayModal />
          <Pressable
            style={styles.howToPlayModalButton}
            onPress={() => {
              props.playSound('click')
              setModalVisible(!modalVisible)
            }}
          >
            <Text>Hide</Text>
          </Pressable>
        </View>
      </Modal>
      
    </View>
  )
}

const mapDispatchToProps = { newUsername, newSocket, newGameCode, newFakeOpponent, playSound, newSocketId, newToken }


// null is currently a placeholder for mapStateToProps

export default connect(null, mapDispatchToProps)(Homescreen);
