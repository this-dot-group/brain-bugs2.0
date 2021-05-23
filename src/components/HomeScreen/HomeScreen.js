import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { Image, Input } from 'react-native-elements'
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import socketIO from 'socket.io-client';
import faker from 'faker';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';

// modular styles
import { Buttons, Images, Views, Typography, Colors } from '../../styles/'

// socket imports
import { newSocket } from '../../store/socketReducer.js';
import { newUsername, newGameCode } from '../../store/userReducer.js';
import { Button } from 'react-native';
import { TextBase } from 'react-native';


// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
const EXPO_LOCAL_URL = '192.168.0.3' // Tia

// const EXPO_LOCAL_URL = '10.0.0.199' // Chris


const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

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

  useEffect(() => {
    props.newSocket(socket)
    let codeNum = faker.random.number();
    let code = codeNum.toString();
    while (code.length !== 5) {
      codeNum = faker.random.number()
      code = codeNum.toString();
    }
    props.newGameCode(code)
  }, [])

  const handleUsernameChange = (username) => {

    if (username) {
      props.newUsername(username)
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  return (
    <View style={styles.container}>

      <Pressable
        style={styles.howToPlayModalButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>How To Play</Text>
      </Pressable>
      
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
    <Pressable style={styles.goButton}>
      <Link to='/lobby' >
        <Text>Go!</Text>
      </Link>
    </Pressable>
    
    }



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

const mapDispatchToProps = { newUsername, newSocket, newGameCode }


// null is currently a placeholder for mapStateToProps

export default connect(null, mapDispatchToProps)(Homescreen);
