import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { Redirect } from 'react-router-native';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { connect } from 'react-redux';
import MuteButton from '../MuteButton/MuteButton';

import { Views, Typography, Buttons } from '../../styles';
import { PixelButton, Spinner } from '../Shared';

const WaitingRoom2 = (props) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)
  const [backToLobby, setBackToLobby] = useState(false);

  const { socket, screenDeviceWidth } = props;

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
    innerText: {
      ...Typography.innerText[screenDeviceWidth],
    },
    howToPlayBtn: {
      ...Buttons.howToPlayBtn[screenDeviceWidth]
    },
    subtitle: {
      ...Typography.normalText[screenDeviceWidth],
      marginBottom: 4
    },
    modalView: {
      ...Views.modalView,
    },
  })

  const redirectToHowToPlay = usernames => {
    props.newOpponent(usernames.gameMaker)
    setRoomJoin(true);
  }

  const redirectGameJoinerToLobby = () => {
    setTimeout(() => {
      Alert.alert(
        "Your opponent sux!",
        `We told em not to leave app while waiting, but they did, and now we're redirecting you back to lobby. Sry!`,
        [
          { text: "Back to Lobby", onPress: () => setBackToLobby(true)}
        ],
        { cancelable: false }
      );
    }, 1000)
  }

  const cancelGame = () => {
    socket.emit('cancelGame');
    setBackToLobby(true);
  }

  useEffect(() => {

    socket.on('redirectToHowToPlay', redirectToHowToPlay)
    socket.on('couldNotJoinPlayers', redirectGameJoinerToLobby)

    return () => {
      socket.off('redirectToHowToPlay', redirectToHowToPlay);
      socket.off('couldNotJoinPlayers', redirectGameJoinerToLobby)
    }

  }, [])

  return (
    <View style={styles.container}>
      <HowToPlayModal 
        visible={modalVisible}
        setVisible={setModalVisible}
        deviceSize={screenDeviceWidth}
      />

        <View style={styles.topRowView}>
          <PixelButton buttonStyle={styles.howToPlayBtn}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={{height: '100%', width: '100%'}}>
                <Text style={styles.innerText}>How To Play</Text>
            </Pressable> 
          </PixelButton>
        </View>

        
        <Text style={styles.subtitle}>
          We have alerted your opponent, please wait a moment...
        </Text>

        <Spinner />

        <View style={styles.bottomRowView}>
          <PixelButton buttonStyle={styles.howToPlayBtn}>
            <Pressable
              onPress={cancelGame}
              style={{height: '100%', width: '100%'}}
              >
                <Text style={styles.innerText}>Cancel Game</Text>
            </Pressable> 
          </PixelButton>
     
          <MuteButton/>
        </View>

        {roomJoin &&
          <Redirect to='/howtoplay' />
        }

        {backToLobby && <Redirect to='/lobby' />}


      </View>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { newOpponent }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom2);
