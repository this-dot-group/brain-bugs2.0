import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';

// FOR PUSH NOTIFICATIONS, i think the second one doesnt work?
// import { Notifications } from 'expo';
// import * as Notifications from 'expo-notifications';

import { Buttons, Views, Typography } from '../../styles';

import { EXPO_LOCAL_URL } from '../../../env'

// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.3' // Tia

// const EXPO_LOCAL_URL = '10.0.0.199' // Chris
import socketIO from 'socket.io-client';
const fakeOpponentSocket = socketIO(`http://${EXPO_LOCAL_URL}:3000`);

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

  // const [questions, setQuestions] = useState([]);

  const handleCodeCopy = () => {
    Clipboard.setString(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  useEffect(() => {

    // TODO: EVENT LISTENER FOR PUSH NOTIFICATIONS

    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     // can do other stuff here too
    //   }),
    // });

    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions)

    })()

  }, [])

  useEffect(() => {
    props.fullGameInfo.userName = props.userName;
    props.fullGameInfo.gameCode = props.gameCode;

    if(props.fullGameInfo.liveGameQuestions) {
      props.socket.emit('newGame', props.fullGameInfo)
    }


    if (props.fullGameInfo.numPlayers === 1) {
      console.log('in one player waiting room')
      props.newFakeOpponent(fakeOpponentSocket)
      fakeOpponentSocket.emit('joinTwoPlayer', [props.gameCode, 'Cricket'])
    }


    const redirectToHowToPlay = usernames => {
      console.log(usernames.gameJoiner)
      props.newOpponent(usernames.gameJoiner)
      setRoomJoin(true);
    }

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
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
    socket: state.socketReducer,
    publicOrPrivate: state.gameInfoReducer.publicOrPrivate,
    fullGameInfo: state.gameInfoReducer

  }
}
const mapDispatchToProps = { newOpponent, getQuestions, newFakeOpponent }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
