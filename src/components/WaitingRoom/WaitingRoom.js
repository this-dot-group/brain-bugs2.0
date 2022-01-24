import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet, Image, Alert } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent, resetUserGameToken } from '../../store/userReducer'
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
  const [showNoMoreQuestionsOptions, setShowNoMoreQuestionsOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState('');

  const handleCodeCopy = () => {
    Clipboard.setString(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const handleNotificationResponse = response => {
    // response.notification.request.content.data has the relevant info sent from two person event
    // { gameCode, gameMaker, gameJoiner}
    props.socket.emit('joinTwoPlayerViaPushNotification', response.notification.request.content.data)
  };

  const redirectGameMakerToLobby = () => {
    // ok to do without an alert since this only occurs if gameMaker has the app backgrounded and their push token was invalid so they werent able to get push notification
    setBackToLobby(true);
  };

  const cancelGame = () => {

    props.socket.emit('cancelGame');

    setBackToLobby(true);
  }

  const handleNoQuestions = async () => {
    if(props.location.state?.token) {
      await props.resetUserGameToken(props.location.state?.token);
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions,props.location.state?.token);
      return;
    }
    setShowNoMoreQuestionsOptions(true);
  }

  const resetGameToken = async () => {
    await props.resetUserGameToken()
    await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, props.token, handleNoQuestions);
    setShowNoMoreQuestionsOptions(false);
  }

  useEffect(() => {
    const tokenToUse = props.location.state?.token || props.token;

    setToken(tokenToUse);

    // don't need this anymore because it only ran when push notification was interacted with while the app is in foreground, but at this point we aren't sending a notification when app is foregrounded, we're just dropping them into game
    // Notifications.addNotificationReceivedListener(handleNotification);
    
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, tokenToUse, handleNoQuestions);
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

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)
    props.socket.on('startOnePlayer', startOnePlayer)
    props.socket.on('couldNotJoinPlayers', redirectGameMakerToLobby)
    
    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
      props.socket.off('startOnePlayer', startOnePlayer);
      props.socket.off('couldNotJoinPlayers', redirectGameMakerToLobby)
    }

  }, [props.fullGameInfo.liveGameQuestions])

  if (props.fullGameInfo.numPlayers === 2 && !props.location.state?.token) {
    return (

      <View>
        <AppStateTracker
          gameCode={props.gameCode}
          gamePhase='waiting_room' />
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
        {showNoMoreQuestionsOptions && 
          <View>
            <Text>You have played all the questions in this category!</Text>
            <Pressable
              style={styles.gameCodeCopyButton}
              onPress={resetGameToken}
            >
              <Text>Play this category with repeated questions</Text>
            </Pressable>
            <Pressable
              style={styles.gameCodeCopyButton}
              onPress={() => setBackToLobby(true)}
            >
              <Text>Go back to lobby to choose a new category</Text>
            </Pressable>

          </View>
        }

        {copied && <Text style={styles.alertText}> Copied </Text>}

        {backToLobby && <Redirect to='/lobby' />}

        <Pressable
          style={styles.gameCodeCopyButton}
          onPress={cancelGame}>
          <Text>Cancel Game</Text>
        </Pressable>
        {roomJoin &&
          <Redirect to='/howtoplay' />
        }
      </View>
    )
  }
  else return roomJoin
    ? <Redirect to='/howtoplay' />
    : <Image
      source={require('../../images/win95_hourglass.gif')}
      style={{ height: 30, width: 30 }}
    />
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
const mapDispatchToProps = { newOpponent, getQuestions, newFakeOpponent, resetUserGameToken }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
