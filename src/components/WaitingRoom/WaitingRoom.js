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

  const [copied, setCopied] = useState(false);


  const handleCodeCopy = () => {
    Clipboard.setString(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  useEffect(() => {

    props.fullGameInfo.userName = props.userName;
    props.fullGameInfo.gameCode = props.gameCode;
    props.socket.emit('newGame', props.fullGameInfo )

  }, [])


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

      {props.publicOrPrivate === 'private' &&

        <Pressable
        style={styles.openButton}
        onPress={handleCodeCopy}>
        <Text>{props.gameCode}</Text>
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
           socket: state.socketReducer,
           publicOrPrivate: state.gameInfoReducer.publicOrPrivate,
           fullGameInfo: state.gameInfoReducer

          }
}

export default connect(mapStateToProps)(WaitingRoom);
