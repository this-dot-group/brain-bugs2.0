import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Redirect } from 'react-router-native';
import * as Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent, resetUserGameToken } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown';
import { Typography, Views, Buttons } from '../../styles';
import AppStateTracker from '../AppState/AppStateTracker.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import { Spinner, PixelPressable, MuteButton } from '../Shared';
import { EXPO_LOCAL_URL } from '../../../env'
import axios from 'axios';


const WaitingRoom = (props) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)
  const [backToLobby, setBackToLobby] = useState(false);
  const [showNoMoreQuestionsOptions, setShowNoMoreQuestionsOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState('');
  const [waitingRoomTriviaObjs, setWaitingRoomTriviaObjs] = useState(undefined)
  const [showRandomTrivia, setShowRandomTrivia] = useState(false);
  const [showRandomTriviaAnswer, setShowRandomTriviaAnswer] = useState(false);
  const [seconds, setSeconds] = useState(5000);
  const [showCountdown, setShowCountdown] = useState(false);
  const [goCountdown, setGoCountdown] = useState(false);
  const [triviaQuestionIndex, setTriviaQuestionIndex] = useState(0);


  const { screenDeviceWidth } = props;

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
    noMoreCategoriesView: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center'
    },
    noMoreCategoriesInnerView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center'
    },
    alertText: {
      ...Typography.alertText[screenDeviceWidth],
    },
    waitingText: {
      ...Typography.headingTwoText[screenDeviceWidth]
    },
    privateWaitingText: {
      ...Typography.normalText[screenDeviceWidth],
      textAlign: 'center'
    },
    normalText: {
      ...Typography.normalText[screenDeviceWidth]
    },
    modalView: {
      ...Views.modalView,
    },
    howToPlayBtn: {
      ...Buttons.howToPlayBtn[screenDeviceWidth]
    },
    noMoreCategoriesBtnsLeft: {
      ...Buttons.noMoreCategoriesBtns[screenDeviceWidth],
      marginRight: 14
    },
    noMoreCategoriesBtnsRight: {
      ...Buttons.noMoreCategoriesBtns[screenDeviceWidth],
      marginLeft: 14
    },
    noMoreCategoriesHeading: {
      ...Typography.headingTwoText[screenDeviceWidth],
      textAlign: 'center'
    }
  })

  const handleCodeCopy = () => {
    console.log('in handleCodeCopy:', props.gameCode)
    Clipboard.setStringAsync(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const redirectGameMakerToLobby = () => {
    setBackToLobby(true);
  };

  const cancelGame = () => {
    props.socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const handleNoQuestions = async () => {
    if(props.location.state?.token) {
      await props.resetUserGameToken(props.location.state?.token);
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, props.location.state?.token, screenDeviceWidth);
      return;
    }
    setShowNoMoreQuestionsOptions(true);
  }

  const resetGameToken = async () => {
    await props.resetUserGameToken()
    await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, props.token, handleNoQuestions, screenDeviceWidth);
    setShowNoMoreQuestionsOptions(false);
  }

  useEffect(() => {
    const tokenToUse = props.location.state?.token || props.token;

    setToken(tokenToUse);

    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions, tokenToUse, handleNoQuestions, screenDeviceWidth);

      try {
        const waitingRoomTriviaReq = await axios.get(`http://${EXPO_LOCAL_URL}:3000/waitingRoomTrivia`);
        setWaitingRoomTriviaObjs(waitingRoomTriviaReq.data)
        setTimeout(() => {
          setShowRandomTrivia(true);
          setShowCountdown(true);
          setGoCountdown(true);
        }, 2000)
      } catch (e) {
        // this state will just continue to show the loading circle
        console.error('ERROR IN WAITING ROOM TRIVIA:', e);
      }

    })()

  }, [])

  useEffect(() => {
    if(seconds === 0) {
      setGoCountdown(false);
      setShowCountdown(false);
      setShowRandomTriviaAnswer(true);
      setTimeout(() => {
        if(triviaQuestionIndex < 19) {
          setShowRandomTriviaAnswer(false);
          setTriviaQuestionIndex(triviaQuestionIndex + 1) 
          setSeconds(5000);
          setShowCountdown(true);  
          setGoCountdown(true);
        } else {
          setWaitingRoomTriviaObjs(undefined)
        }
      }, 3000)   

    }
  }, [seconds]);
  
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
          {!showNoMoreQuestionsOptions && (
            <PixelPressable
              buttonStyle={styles.howToPlayBtn}
              pressableProps={{
                onPress: cancelGame
              }}
            >Cancel Game</PixelPressable>
          )}

          {props.publicOrPrivate === 'private' && (
            <PixelPressable
              buttonStyle={styles.howToPlayBtn}
              pressableProps={{
                onPress: handleCodeCopy,
              }}
            >
              {copied ? <Text style={styles.alertText}>Copied!</Text> : props.gameCode}
            </PixelPressable>
          )}
        </View>

        {props.publicOrPrivate === 'private' &&
          <>
            <Text style={styles.privateWaitingText}>
              Give the game code to your opponent! Click to copy. Game will start when other player joins.
            </Text>
          </>
        }

        {props.publicOrPrivate !== 'private' && !showNoMoreQuestionsOptions && !waitingRoomTriviaObjs && (
          <>
            <Text style={styles.waitingText}>Waiting for 1 more player...</Text> 
            <Spinner />
          </>
        )
        }

        {props.publicOrPrivate !== 'private' && 
        !showNoMoreQuestionsOptions && 
        waitingRoomTriviaObjs && 
        !showRandomTrivia && (
          <>
            <Text style={styles.alertText}>Some trivia while you wait!</Text>
            <Text style={styles.alertText}>...</Text>
          </>
        )
        }

        {props.publicOrPrivate !== 'private' && 
        !showNoMoreQuestionsOptions && 
        waitingRoomTriviaObjs && 
        showRandomTrivia && (
          <>
            <Text style={styles.normalText}>{waitingRoomTriviaObjs[triviaQuestionIndex].question}</Text>
            {showCountdown && (
              <Countdown
                deviceWidth={screenDeviceWidth}
                seconds={seconds}
                setSeconds={setSeconds}
                style={{ color: 'red' }}
                go={goCountdown}
                setGo={setGoCountdown}
              /> 
            )}
            {showRandomTriviaAnswer && !showCountdown && <Text style={styles.normalText}>{waitingRoomTriviaObjs[triviaQuestionIndex].answer}</Text>}
            
          </>
        )
        }

        {showNoMoreQuestionsOptions && 
          <View style={styles.noMoreCategoriesView}>
            <Text style={styles.noMoreCategoriesHeading}>You have played all the questions in this category!</Text>
            <View style={styles.noMoreCategoriesInnerView}>
              <PixelPressable
                buttonStyle={styles.noMoreCategoriesBtnsLeft}
                pressableProps={{ onPress: resetGameToken }}
              >
                Play this category, repeat questions
              </PixelPressable>
              <PixelPressable
                buttonStyle={styles.noMoreCategoriesBtnsRight}
                pressableProps={{ onPress: () => setBackToLobby(true) }}
              >
                Back to lobby, new category
              </PixelPressable>
            </View>
          </View>
        }

        <View style={styles.bottomRowView}>
          {!showNoMoreQuestionsOptions && (
            <PixelPressable
              buttonStyle={styles.howToPlayBtn}
              pressableProps={{ onPress: () => setModalVisible(true) }}
            >
              How To Play
            </PixelPressable>
          )}
  
          <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <MuteButton />
          </View>
        
        </View>

        <HowToPlayModal 
          visible={modalVisible}
          setVisible={setModalVisible}
          deviceSize={screenDeviceWidth}
        />

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
    userName: state.username,
    gameCode: state.userReducer.gameCode,
    token: state.userReducer.token,
    socket: state.socketReducer,
    fakeOpponentSocket: state.fakeOpponentSocketReducer,
    publicOrPrivate: state.gameInfoReducer.publicOrPrivate,
    fullGameInfo: state.gameInfoReducer,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
const mapDispatchToProps = { newOpponent, getQuestions, newFakeOpponent, resetUserGameToken }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
