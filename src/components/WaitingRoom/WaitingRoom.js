import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet} from 'react-native'
import { Redirect } from 'react-router-native';
import * as Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import MuteButton from '../MuteButton/MuteButton';
import { newOpponent, resetUserGameToken } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { Views } from '../../styles';
import AppStateTracker from '../AppState/AppStateTracker.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import PixelButton from '../Shared/PixelButton.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  CancelGameButton: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  gameCodeCopyButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  alertText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10
  },
  modalView: {
    ...Views.modalView,
  },
  HowToPlayModalButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'flex-start',
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
    console.log('in handleCodeCopy:', props.gameCode)
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

    // THIS IS HAPPENING TO THE GAMEMAKER WHO IS IN THE WAITING ROOM
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

      <View style={styles.container}>
        <AppStateTracker
          gameCode={props.gameCode}
          gamePhase='waiting_room' />

        <View style={styles.topRowView}>
          <PixelButton
            buttonStyle={styles.CancelGameButton}
            onPress={cancelGame}
          >
            <Text>Cancel Game</Text>
          </PixelButton> 

          {/* TODO: maybe we could have feedback on btn, like a shadow that shows up when its copied, instead of changing to "Copied!" */}
          {props.publicOrPrivate === 'private' &&
            <PixelButton
            buttonStyle={styles.gameCodeCopyButton}
            onPress={handleCodeCopy}
            >
            {copied && (
              <Text style={styles.alertText}>Copied!</Text>
            )} 
            {!copied && (
              <Text>
                {props.gameCode}
              </Text>
            )}  
            </PixelButton>  
          }
        </View>

        {props.publicOrPrivate === 'private' &&
          <>
            <Text style={{textAlign: 'center'}}>
              Give the game code to your opponent!
              {"\n"}{"\n"}
              Click to copy
            </Text>
            
          </>
        }

        {props.publicOrPrivate !== 'private' &&
          <Text>Waiting for 1 more player...</Text> 
        }

        <ActivityIndicator
          color='red'
          size='large'
          animating={true} />

        <View style={styles.bottomRowView}>

          <PixelButton
              buttonStyle={styles.HowToPlayModalButton}
              onPress={() => {
                setModalVisible(true);
              }}
            >
            <Text>How To Play</Text>
          </PixelButton>  

          <MuteButton/>
        
        </View>

        <Modal
          transparent={true}
          visible={modalVisible}
          supportedOrientations={['landscape']}
        >
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


        {/* TODO: sim below scenario to see styling */}
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

        {backToLobby && <Redirect to='/lobby' />}
        
        {roomJoin && <Redirect to='/howtoplay' />}

      </View>
    )
  }
  else return roomJoin
    ? <Redirect to='/howtoplay' />
    : <LoadingScreen />
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
