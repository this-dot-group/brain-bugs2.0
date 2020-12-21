import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal } from 'react-native'
import { Link } from 'react-router-native';
import Clipboard from 'expo-clipboard';
// import faker from 'faker';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { connect } from 'react-redux';

import styles from '../../styles/styles'



// Build Alert to notify players

const WaitingRoom = (props) => {

  // console.log('IN THE WAITING ROOM')

  const [modalVisible, setModalVisible] = useState(false)
  const [gameCode, setGameCode] = useState('')
  const [copied, setCopied] = useState(false);

  const createPrivateGame = () => {
    console.log('game code in waiting room', props.gameCode)
    setGameCode(props.gameCode);
  }

  useEffect(() => {

  },[])



  const handleCodeCopy = () => {
    Clipboard.setString(gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  // when clicked, gamecode saves to clipboard. want to make sure second pressable doesnt show until there is a gamecode, also there should be an alert to the user that the code was copied




  return (

    <View>
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
      <Text>Waiting for 1 more player...</Text>

      <ActivityIndicator
        color='red'
        size='large'
        animating={true} />

      {gameCode === '' ?
        <Pressable
          style={styles.openButton}
          onPress={createPrivateGame}>
          <Text>Create Private Game</Text>
        </Pressable>
        :
        <Pressable
          style={styles.openButton}
          onPress={handleCodeCopy}>
          <Text>{gameCode}</Text>
        </Pressable>
      }
      {copied && <Text style={{ color: 'red' }}> Copied </Text>}

      <Link to='/'>
        <Text>(Go Home)</Text>
      </Link>
    </View>
  )
}

const mapStateToProps = (state) => {
  return { userName: state.userReducer.username,
           gameCode: state.userReducer.gameCode,
           socket: state.socket
          }
}

export default connect(mapStateToProps)(WaitingRoom);
