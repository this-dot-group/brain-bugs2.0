import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, AppState } from 'react-native'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import { Spinner, PixelPressable } from '../Shared';
import { START_COUNTDOWN } from '../../../config';
import { playSound } from '../../store/soundsReducer';
import AppStateTracker from '../AppState/AppStateTracker';
import { Buttons, Typography } from '../../styles/';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import AnimatedView from '../Shared/AnimatedView';

function HowToPlay(props) {
  const [seconds, setSeconds] = useState(START_COUNTDOWN * 1000);
  const [goCountdown, setGoCountdown] = useState(true);
  const [goToGame, setGoToGame] = useState(false);
  const [backToLobby, setBackToLobby] = useState(false);

  const { username, opponent, socket, gameCode, screenDeviceWidth } = props;

  const styles = StyleSheet.create({
    root: {
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%'
    },
    topRow: {
      paddingHorizontal: 50,
      paddingTop: 30,
    },
    body: {
      alignItems: 'center',
    },
    howToPlayBtn: {
      ...Buttons.howToPlayBtn[screenDeviceWidth]
    },
    names: {
      ...Typography.headingThreeText[screenDeviceWidth]
    },
    subtitle: {
      ...Typography.normalText[screenDeviceWidth],
      marginBottom: 4
    },
    countdown: {
      ...Typography.smallInnerText[screenDeviceWidth],
      color: 'red'
    },
  })

  const handleOpponentLeftResponse = () => {
    socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const showOpponentLeftAlert = () => {

    setGoCountdown(false);
    
    Alert.alert(
      'Your opponent left!',
      'Go back to the lobby for a new game.',
      [
        {
          text: 'Go to Lobby',
          onPress: () => handleOpponentLeftResponse(),
        },
      ],
      { cancelable: false }
    );
  }

  const handleQuit = () => {
    socket.emit('leaveRoom');
    setBackToLobby(true);
  }

  useEffect(() => {
    if(seconds === 0) {
      setGoCountdown(false);
      setGoToGame(true);
    }
    socket.on('opponentLeftRoom', showOpponentLeftAlert);
    socket.on('opponentLeftDuringGame', showOpponentLeftAlert);

    return () => {
      socket.off('opponentLeftDuringGame', showOpponentLeftAlert);
      socket.off('opponentLeftRoom', showOpponentLeftAlert);
    }
  }, [seconds]);

  if (backToLobby) {
    return <Redirect to='/lobby' />
  }

  if (AppState.currentState !== 'active') {
    return <Redirect to='/' />
  }

  if (goToGame) {
    return <Redirect to='/gameplay' />
  }

  return (
    <>
      <AppStateTracker
        gameCode={gameCode}
        gamePhase='game_play'
      />
      <AnimatedView style={styles.root}>
        <View style={styles.topRow}>
          <PixelPressable
            buttonStyle={styles.howToPlayBtn}
            pressableProps={{ onPress: handleQuit }}
          >Quit</PixelPressable>
        </View>

        <View style={styles.body}>
          <Text style={styles.names}>{username} {opponent && `vs ${opponent}`}</Text>
          <Text style={styles.subtitle}>Game starting in</Text>
          <Spinner>
            <Countdown
              seconds={seconds}
              setSeconds={setSeconds}
              go={goCountdown}
              setGo={setGoCountdown}
              style={styles.countdown}
            />
          </Spinner>
        </View>

        <SettingsDrawer />
      </AnimatedView>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.username,
    opponent: state.userReducer.opponent,
    gameCode: state.userReducer.gameCode,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
export default connect(mapStateToProps, { playSound })(HowToPlay)