import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

// modular styles
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import { PixelButton, KeyboardAvoidingComponent, Hider } from '../Shared';
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
    width: 120,
    height: 120,
  },
  // NAME TEXT
  logoText:{
    fontFamily: 'DotGothic',
    fontSize: 60
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
    fontSize: 16,
    paddingLeft: 8,
    flexDirection: 'row',
    paddingRight: 0
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 16,
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
      
      <Image
        source={require('../../images/BRAIN_BUG1.png')}
        style={styles.logoImg} />
      <Text style={styles.logoText}>BRAIN BUGS</Text>  

      <KeyboardAvoidingComponent
        offset={0}
        style={{ backgroundColor: 'transparent' }}
      >
        <View style={styles.inputNestedRowView}>
          <PixelButton
            buttonStyle={{width: 300, flexDirection: 'row'}}
          >
            <TextInput
              style={styles.input}
              placeholder={'username'}
              onChangeText={value => handleUsernameChange(value)}
            />
            <Hider
              show={validUsername}
              style={{ transform: [{translateX: 8 }], zIndex: 1, position: 'relative' }}
            >
              <PixelButton buttonStyle={{ width: 80 }}>
                <Pressable onPress={handleGo}>
                  <Text style={styles.innerText}>Go!</Text>
                </Pressable>
              </PixelButton>
            </Hider>
          </PixelButton>
        </View>
      </KeyboardAvoidingComponent>


      <View style={styles.bottomNestedRowView}>
        <PixelButton buttonStyle={{width: 150}}>
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
