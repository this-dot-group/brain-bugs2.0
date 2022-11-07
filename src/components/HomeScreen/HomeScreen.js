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
    fontSize: 54
  },
  // WRAPS USERNAME ROW
  inputNestedRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
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
    fontSize: 14,
    paddingLeft: 8,
    flexDirection: 'row',
    paddingRight: 0
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 14,
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
    // For some reason we need to set the socket id in two different ways
    props.newSocketId(socket.id)
    props.newFakeOpponent(fakeOpponentSocket);
    props.newToken();
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
        <PixelButton buttonStyle={{width: 120}}>
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
