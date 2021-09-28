import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet, Alert } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { Buttons, Views, Typography } from '../../styles';
import AppStateTracker from '../AppState/AppStateTracker.js';

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

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)
  const [backToLobby, setBackToLobby] = useState(false);


  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState('');

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


    // RECEIVE ALL IF APP IN FOREGROUND
    // RECEIVE ONLY INTERACTED IF APP IS IN BACKGROUND
    const handleNotification = notification => {
      console.log('GAMEMAKER HAS RECEIVED THEIR NOTIFICATION:', notification);
    };
  
    const handleNotificationResponse = response => {
      // response.notification.request.content.data has the relevant info sent from two person event
      // { gameCode, gameMaker, gameJoiner}
      console.log('GAMEMAKER HAS INTERACTED WITH THEIR NOTIFICATION:', response.notification.request.content.data);

      props.socket.emit('joinTwoPlayerViaPushNotification', response.notification.request.content.data)

    };
    
    Notifications.addNotificationReceivedListener(handleNotification);
    
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);


    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, tokenToUse)
      
    })()
    
  }, [])
  
  useEffect(() => {
    props.fullGameInfo.userName = props.userName;
    props.fullGameInfo.gameCode = props.gameCode;
    props.fullGameInfo.token = props.token;

    //need to re-emit so that the app state is attached in the first time something is added to availableGames
    let appStateGameCode = {
      appState: 'active',
      gameCode: props.gameCode,
    }

    if(props.fullGameInfo.liveGameQuestions) {
      props.socket.emit('newGame', {...props.fullGameInfo, token })

      props.socket.emit('appStateUpdate', appStateGameCode)
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

    const invalidPushTokenRedirect = () => {
      Alert.alert(
        "Oh no!",
        `We were unable to connect your game.`,
        [
          {
            text: "Back to Lobby",
            onPress: () => {
              setBackToLobby(true)
            },
          },
        ],
        { cancelable: false }
      );
    }

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)
    props.socket.on('startOnePlayer', startOnePlayer)
    props.socket.on('invalidPushTokenRedirect', invalidPushTokenRedirect)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
      props.socket.off('startOnePlayer', startOnePlayer);
      props.socket.off('invalidPushTokenRedirect', invalidPushTokenRedirect)
    }

  }, [props.fullGameInfo.liveGameQuestions])

  if (props.fullGameInfo.numPlayers === 2) {
    return (

      <View>
        <AppStateTracker
          gameCode={props.gameCode} />
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

        {backToLobby && <Redirect to='/lobby' />}

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
