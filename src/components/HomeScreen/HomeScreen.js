import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import socketIO from 'socket.io-client';
import faker from 'faker';
import { newSocket } from '../../store/socketReducer.js';

// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.55' // Tia
const EXPO_LOCAL_URL = '10.0.0.199' // Chris




import { newUsername, newGameCode } from '../../store/userReducer.js';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';

import styles from '../../styles/styles.js'

const socket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

function Homescreen(props) {
  const [modalVisible, setModalVisible] = useState(false)

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

  const handleGo = (username) => {
    
    if (username) {
      props.newUsername(username)}
  }

  return (
    <View>
      <Text>Welcome to This Game</Text>

      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.image} />

      <Text>Please enter your username:</Text>

      <Input
        placeholder={'username'}
        style={styles.input}
        onChangeText={value =>  handleGo(value)}
        />
      <Link to='/lobby'>
        <Text>Go!</Text>
      
      </Link>


      {/* how to play component wrapped in Modal here, can think about moving some of this to HowToPlayModal.js component */}

      <Modal
        transparent={true}
        visible={modalVisible}>

        <View
          style={styles.modalView}>
          <HowToPlayModal />
          <Pressable
            style={styles.openButton}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}
            >
            <Text>Hide</Text>
          </Pressable>
        </View>
      </Modal>


      <Pressable
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
        >
        <Text>How To Play</Text>
      </Pressable>




    </View>
  )
}

const mapDispatchToProps = { newUsername, newSocket, newGameCode }


// null is currently a placeholder for mapStateToProps

export default connect(null, mapDispatchToProps)(Homescreen);
