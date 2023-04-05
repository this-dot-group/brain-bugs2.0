import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, AppState } from 'react-native'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal';
import { Spinner, PixelPressable, MuteButton } from '../Shared';
import { START_COUNTDOWN } from '../../../config';
import { playSound } from '../../store/soundsReducer';
import AppStateTracker from '../AppState/AppStateTracker';
import { Buttons, Views, Typography } from '../../styles/';

function HowToPlay(props) {
  const [seconds, setSeconds] = useState(START_COUNTDOWN * 1000);
  const [modalVisible, setModalVisible] = useState(false);
  const [goCountdown, setGoCountdown] = useState(true);
  const [goToGame, setGoToGame] = useState(false);
  const [backToLobby, setBackToLobby] = useState(false);

  const { username, opponent, playSound, socket, gameCode, screenDeviceWidth } = props;

  const styles = StyleSheet.create({
    root: {
      justifyContent: 'space-between',
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
    bottomRow: {
      paddingHorizontal: 50,
      paddingBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
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
    modalView: {
      ...Views.modalView,
    }
  })

  const handleOpponentLeftResponse = () => {
    socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const showOpponentLeftAlert = () => {

    setGoCountdown(false);
    
    Alert.alert(
      'Your opponent left!',
      'Please go back to lobby for new game.',
      [
        {
          text: 'Lobby',
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

  const handleHowToPlay = () => {
    playSound('click');
    setModalVisible(true);
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
      <View style={styles.root}>
        <View style={styles.topRow}>
          <PixelPressable
            buttonStyle={styles.howToPlayBtn}
            pressableProps={{ onPress: handleQuit }}
          >Quit</PixelPressable>
        </View>

        <View style={styles.body}>
          <Text style={styles.names}>{username} {opponent && `vs ${opponent}`}</Text>
          <Text style={styles.subtitle}>Game starting in ...</Text>
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

        <View style={styles.bottomRow}>
          <PixelPressable
            buttonStyle={styles.howToPlayBtn}
            pressableProps={{ onPress: handleHowToPlay }}
          >How To Play</PixelPressable>

          <HowToPlayModal
            visible={modalVisible}
            setVisible={setModalVisible}
            deviceSize={screenDeviceWidth}
          />

          <MuteButton />

        </View>
      </View>
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