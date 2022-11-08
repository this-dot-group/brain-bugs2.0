import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal';
import { Spinner, PixelButton } from '../Shared';
import MuteButton from '../MuteButton/MuteButton';
import { START_COUNTDOWN } from '../../../config';
import { playSound } from '../../store/soundsReducer';
import { Views } from '../../styles';

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
  const { username, opponent, playSound } = props;

  const [seconds, setSeconds] = useState(START_COUNTDOWN * 1000);
  const [modalVisible, setModalVisible] = useState(false)

  const [goCountdown, setGoCountdown] = useState(true);
  const [goToGame, setGoToGame] = useState(false)

  useEffect(() => {
    if(seconds === 0) {
      setGoCountdown(false);
      setGoToGame(true);
    }
  }, [seconds])

  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <PixelButton buttonStyle={{width: 150}}>
          <Pressable>
            <Link to='/'>
              <Text style={styles.innerText}>Quit</Text>
            </Link>
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
        <PixelButton buttonStyle={{width: 100}}>
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
      
      {goToGame &&
        <Redirect to='/gameplay' />
      }
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
    opponent: state.userReducer.opponent,
  }
}
export default connect(mapStateToProps, { playSound })(HowToPlay)