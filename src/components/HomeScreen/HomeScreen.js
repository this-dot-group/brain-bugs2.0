import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';

// modular styles
import { Buttons, Images, Views, Typography, Colors } from '../../styles/'
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
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: '30%',
  },
  // GO BTN SHOWS UP AFTER USERNAME
  goButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 20
  },
  // HOW TO PLAY BTN
  howToPlayModalButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 100
  },
  modalView: {
    ...Views.modalView,
  },
  // container: {
  //   ...Views.viewContainer,
  // },
  // howToPlayModalButton: {
  //   ...Buttons.openButton,
  //   backgroundColor: Colors.orange.hex,
  //   position: 'absolute',
  //   bottom: 50
  // },
  // goButton: {
  //   ...Buttons.openButton,
  //   backgroundColor: Colors.red.hex,
  //   minWidth: '90%',
  //   alignItems: 'center'
  // },
  // logoImg: {
  //   ...Images.logoImg,
  // },
  // modalView: {
  //   ...Views.modalView,
  // },
  // input: {
  //   ...Typography.input,
  // }
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

      <View style={styles.inputNestedRowView}>
        <TextInput
          placeholder={'username'}
          style={styles.input}
          onChangeText={value => handleUsernameChange(value)}
        />

        {validUsername &&
          <Pressable style={styles.goButton} onPress={handleGo}>
            <Text>Go!</Text>
          </Pressable>
        }
      </View>


      <View style={styles.bottomNestedRowView}>
        <Pressable
          style={styles.howToPlayModalButton}
          onPress={() => {
            props.playSound('click')
            setModalVisible(true);
          }}
        >
          <Text>How To Play</Text>
        </Pressable>

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
