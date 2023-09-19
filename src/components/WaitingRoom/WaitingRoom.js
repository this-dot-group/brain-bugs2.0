import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Share, Alert } from 'react-native'
import { Redirect } from 'react-router-native';
import * as Clipboard from 'expo-clipboard';
import { newOpponent, resetUserGameToken } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
import { newFakeOpponent } from '../../store/fakeOpponentSocketReducer'
import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown';
import { Typography, Buttons } from '../../styles';
import AppStateTracker from '../AppState/AppStateTracker.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import { Spinner, PixelPressable } from '../Shared';
import { EXPO_LOCAL_URL } from '../../../env'
import axios from 'axios';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer.js';
import AnimatedView from '../Shared/AnimatedView';
import { CustomAlert } from '../Shared/CustomAlert';
import { red } from '../../styles/colors';

const WaitingRoom = (props) => {
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
  const [openCustomAlert, setOpenCustomAlert] = useState(false)
  const [alertHeading, setAlertHeading] = useState('')
  const [alertText, setAlertText] = useState('')
  const [alertBtnOneText, setAlertBtnOneText] = useState('')
  // const [alertBtnOneAction, setAlertBtnOneAction] = useState(undefined)
  const [alertBtnTwoText, setAlertBtnTwoText] = useState('')
  // const [alertBtnTwoAction, setAlertBtnTwoAction] = useState(undefined)

  const { screenDeviceWidth } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingLeft: 40,
      paddingRight: 40,
      paddingBottom: 40,
      width: '100%',
    },
    topRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '20%'
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
      ...Typography.headingTwoText[screenDeviceWidth],
      marginBottom: 4
    },
    privateWaitingText: {
      ...Typography.normalText[screenDeviceWidth],
      textAlign: 'center'
    },
    normalText: {
      ...Typography.normalText[screenDeviceWidth],
      textAlign: 'center',
    },
    countdown: {
      ...Typography.normalText[screenDeviceWidth],
      color: red.hex,
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
    Clipboard.setStringAsync(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const handleShareCode = async () => {
    try {
      const result = await Share.share({
        message:
          `Come play Brain Bugs with me! \nHere's the code to join my game: ${props.gameCode}`,
      });
      // On iOS you can track if the user actually shared it and where they shared it, or if they dismissed the sharing menu. Can't track any of that on Android. 

      // On Android, when code is shared to another app it takes you out of Brain Bugs (app state tracker records that the app goes to background) and then you're in the app your sharing to. I don't think it's the same on iOS- need to have Josh test.
    } catch (error) {
      Alert.alert(
        'We were unable to open sharing.',
        'Share the game code with your opponent.',
        [
          {
            text: 'Copy Code',
            onPress: () => handleCodeCopy(),
          },
        ],
        { cancelable: false }
      );
    }
  }

  const redirectGameMakerToLobby = () => {
    setBackToLobby(true);
  };

  const cancelGame = () => {
    setOpenCustomAlert(true)
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
        }, 3000)
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
      gamePhase: 'waiting_room',
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

  const handleFullGameCancel = () => {
    props.socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const handleContinueWithGame = () => {
    setOpenCustomAlert(false)
  }


  if (props.fullGameInfo.numPlayers === 2 && !props.location.state?.token) {
    return (

      <AnimatedView style={styles.container} useSite="WaitingRoom">
        <AppStateTracker
          gameCode={props.gameCode}
          gamePhase='waiting_room' />
        
        <CustomAlert 
          visible={openCustomAlert} 
          setVisible={setOpenCustomAlert}
          deviceWidth={screenDeviceWidth}
          copy={
            <Text style={styles.waitingText}>
              Are you sure you want to cancel the game?
            </Text>
          }
          buttons={
            <>
              <PixelPressable
                buttonStyle={{height: 60}}
                pressableProps={{
                  onPress: handleFullGameCancel
                }}
              >Yes, cancel game</PixelPressable>
              <PixelPressable
                buttonStyle={{height: 60}}
                pressableProps={{
                  onPress: handleContinueWithGame
                }}
              >No</PixelPressable>
            </>

          }
        />
            


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
                onPress: handleShareCode,
              }}
            >
              {copied ? <Text style={styles.alertText}>Copied!</Text> : `Code: ${props.gameCode}`}
            </PixelPressable>
          )}
        </View>
        
        <View style={{ width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center'}}>
          {props.publicOrPrivate === 'private' &&
            <>
              <Text style={styles.privateWaitingText}>
                Give the game code to your opponent! Click code button to share. Game will start when your opponent joins.
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
                  style={styles.countdown}
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
                  Play this category with repeat questions
                </PixelPressable>
                <PixelPressable
                  buttonStyle={styles.noMoreCategoriesBtnsRight}
                  pressableProps={{ onPress: () => setBackToLobby(true) }}
                >
                  Go back to the lobby 
                </PixelPressable>
              </View>
            </View>
          }

        </View>

        <SettingsDrawer/>

        {backToLobby && <Redirect to='/lobby' />}
        {roomJoin && <Redirect to='/howtoplay' />}
        
      </AnimatedView>
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
