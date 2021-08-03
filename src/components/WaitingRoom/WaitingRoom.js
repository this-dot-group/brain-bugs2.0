import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';

import { Buttons, Views, Typography } from '../../styles';

import { EXPO_LOCAL_URL } from '../../../env'

// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.3' // Tia

// const EXPO_LOCAL_URL = '10.0.0.199' // Chris
// import socketIO from 'socket.io-client';
// const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  HowToPlayModalButton: {
    ...Buttons.openButton,
  },
  alertText: {
    ...Typography.alertText,
  },
  gameCodeCopyButton: {
    ...Buttons.openButton,
  }
})

const WaitingRoom = (props) => {

  // console.log('IN THE WAITING ROOM')

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)

  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState('');

  // const [questions, setQuestions] = useState([]);

  const handleCodeCopy = () => {
    Clipboard.setString(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  useEffect(() => {
    const tokenToUse = props.location.state?.token || props.token
    setToken(tokenToUse);
    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, tokenToUse)
      
    })()
    
  }, [])
  
  useEffect(() => {
    props.fullGameInfo.userName = props.userName;
    props.fullGameInfo.gameCode = props.gameCode;
    props.fullGameInfo.token = props.token;

    if(props.fullGameInfo.liveGameQuestions) {
      // console.log('This needs to be beore "in one player waiting room log"');
      props.socket.emit('newGame', {...props.fullGameInfo, token })
    }


    const redirectToHowToPlay = usernames => {
      props.newOpponent(usernames.gameJoiner)
      setRoomJoin(true);
    }

    const startOnePlayer = (gameCode) => {
      if (props.fullGameInfo.numPlayers === 1) {

        props.fakeOpponentSocket.emit('joinTwoPlayer', [gameCode, 'Cricket']);
      }
    }

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)
    props.socket.on('startOnePlayer', startOnePlayer)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
      props.socket.off('startOnePlayer', startOnePlayer);
    }

  }, [props.fullGameInfo.liveGameQuestions])

  if (props.fullGameInfo.numPlayers === 2) {
    return (

      <View>
        <Modal
          transparent={true}
          visible={modalVisible}>

          <View
            style={styles.modalView}>
            <HowToPlayModal />
            <Pressable
              style={styles.HowToPlayModalButton}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text>Hide</Text>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          style={styles.HowToPlayModalButton}
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
            style={styles.gameCodeCopyButton}
            onPress={handleCodeCopy}>
            <Text>{props.gameCode}</Text>
          </Pressable>

        }

        {copied && <Text style={styles.alertText}> Copied </Text>}

        <Link to='/'>
          <Text>(Go Home)</Text>
        </Link>
        {roomJoin &&
          <Redirect to='/howtoplay' />
        }
      </View>
    )
  }
  else return roomJoin && <Redirect to='/howtoplay' />
}

const mapStateToProps = (state) => {
  return {
    userName: state.userReducer.username,
    gameCode: state.userReducer.gameCode,
    token: state.userReducer.token,
    socket: state.socketReducer,
    fakeOpponentSocket: state.fakeOpponentSocketReducer,
    publicOrPrivate: state.gameInfoReducer.publicOrPrivate,
    fullGameInfo: state.gameInfoReducer

  }
}
const mapDispatchToProps = { newOpponent, getQuestions, newFakeOpponent }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
