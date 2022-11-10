import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Alert, AppState } from 'react-native'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal';
import { Spinner, PixelButton } from '../Shared';
import MuteButton from '../MuteButton/MuteButton';
import { START_COUNTDOWN } from '../../../config';
import { playSound } from '../../store/soundsReducer';
import { Views } from '../../styles';
import AppStateTracker from '../AppState/AppStateTracker';

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
  innerText: {
    fontFamily: 'DotGothic',
  },
  names: {
    fontFamily: 'VT323',
    fontSize: 40,
  },
  subtitle: {
    fontFamily: 'DotGothic',
    fontSize: 20,
    marginBottom: 20
  },
  countdown: {
    fontSize: 20,
    fontFamily: 'DotGothic',
  },
  modalView: {
    ...Views.modalView,
  }
})


function HowToPlay(props) {
  const { username, opponent, playSound, socket, gameCode } = props;

  const [seconds, setSeconds] = useState(START_COUNTDOWN * 1000);
  const [modalVisible, setModalVisible] = useState(false);
  const [goCountdown, setGoCountdown] = useState(true);
  const [goToGame, setGoToGame] = useState(false);
  const [backToLobby, setBackToLobby] = useState(false);

  const handleOpponentLeftResponse = () => {
    socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const showOpponentLeftAlert = () => {

    setGoCountdown(false);
    
    Alert.alert(
      'Your opponent left!',
      'Please press UGH to go back to lobby for new game.',
      [
        {
          text: 'UGH',
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
      <View style={styles.root}>
        <View style={styles.topRow}>
          <PixelButton buttonStyle={{width: 150}}>
            <Pressable
              onPress={handleQuit}
            >
              <Text style={styles.innerText}>Quit</Text>
            </Pressable>
          </PixelButton>
        </View>

        <View style={styles.body}>
          <Text style={styles.names}>{username} {opponent && `vs ${opponent}`}</Text>
          <Text style={styles.subtitle}>Game starting in&nbsp;</Text>
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
          <PixelButton buttonStyle={{width: 150}}>
            <Pressable
              onPress={() => {
                playSound('click')
                setModalVisible(true);
              }}
            >
              <Text style={styles.innerText}>How To Play</Text>
            </Pressable>
          </PixelButton>

          <HowToPlayModal
            visible={modalVisible}
            setVisible={setModalVisible}
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
    username: state.userReducer.username,
    opponent: state.userReducer.opponent,
    gameCode: state.userReducer.gameCode,
  }
}
export default connect(mapStateToProps, { playSound })(HowToPlay)