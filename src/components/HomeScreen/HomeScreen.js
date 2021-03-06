import React, { useEffect, useState } from 'react'
import { Platform, View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { Image, Input } from 'react-native-elements'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-native';
import socketIO from 'socket.io-client';
import faker from 'faker';

import { Audio } from 'expo-av'
import usePlaySound from '../../sounds/usePlaySound'

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';

// modular styles
import { Buttons, Images, Views, Typography, Colors } from '../../styles/'

// socket imports
import { newSocket } from '../../store/socketReducer.js';
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer';
import { playSound } from '../../store/soundsReducer';

import { newUsername, newGameCode } from '../../store/userReducer.js';
import { Button } from 'react-native';
import { TextBase } from 'react-native';
import { EXPO_LOCAL_URL } from '../../../env'


// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.3' // Tia
// const EXPO_LOCAL_URL = '10.0.0.199' // Chris


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
  // const [token, setToken] = useState('');
  
  // const { playSound } = usePlaySound(['flute', 'click']);


  // const registerForPushNotifications = async () => {
  //   if (Constants.isDevice) {
  //     // Get the notifications permission
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //     );
  
  //     let finalStatus = existingStatus;
  //     console.log('final status:', finalStatus);
  
  //     if (existingStatus !== "granted") {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  
  //     if (finalStatus !== "granted") {
  //       return;
  //     }
  
  //     // If the permission was granted, then get the token
  //     const token = await ExpoNotifications.getExpoPushTokenAsync();
  
  //     // Android specific configuration, needs the channel
  //     if (Platform.OS === "android") {
  //       ExpoNotifications.createChannelAndroidAsync("default", {
  //         name: "default",
  //         sound: true,
  //         priority: "max",
  //         vibrate: [0, 250, 250, 250],
  //       });
  //     }
  //     console.log('TOKEN', token);
  
  //     return token;
  //   }
  // };

  useEffect(() => {
    props.newSocket(socket)
    props.newFakeOpponent(fakeOpponentSocket);

    // let codeNum = faker.random.number();
    // let code = codeNum.toString();
    // while (code.length !== 5) {
    //   codeNum = faker.random.number()
    //   code = codeNum.toString();
    // }
    // props.newGameCode(code);

    // GET PUSH NOTIFICATION TOKEN
    

  }, [])

  const handleUsernameChange = (username) => {

    if (username) {
      props.newUsername(username)
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  const handleGo = async () => {
    // Sound does not play here, it goes to lobby too quickly
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
        visible={modalVisible}>

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

const mapDispatchToProps = { newUsername, newSocket, newGameCode, newFakeOpponent, playSound }


// null is currently a placeholder for mapStateToProps

export default connect(null, mapDispatchToProps)(Homescreen);
