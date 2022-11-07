import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet, Alert } from 'react-native'
import { Redirect } from 'react-router-native';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { connect } from 'react-redux';
import MuteButton from '../MuteButton/MuteButton';

import { Views } from '../../styles';
import { PixelButton, Spinner } from '../Shared';

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
    fontFamily: 'DotGothic',
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  },
  modalView: {
    ...Views.modalView,
  },

})

const WaitingRoom2 = (props) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)
  const [backToLobby, setBackToLobby] = useState(false);

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

    props.socket.emit('cancelGame');

    setBackToLobby(true);
  }

  useEffect(() => {

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)
    props.socket.on('couldNotJoinPlayers', redirectGameJoinerToLobby)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
      props.socket.off('couldNotJoinPlayers', redirectGameJoinerToLobby)
    }

  }, [])

  return (
    <View style={styles.container}>
      <HowToPlayModal 
        visible={modalVisible}
        setVisible={setModalVisible}
      />

        <View style={styles.topRowView}>
          <PixelButton buttonStyle={{width: 140}}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={{height: '100%', width: '100%'}}>
                <Text style={styles.innerText}>How To Play</Text>
            </Pressable> 
          </PixelButton>
        </View>

        
        <Text>
          We have alerted your opponent, please wait a moment...
        </Text>

        <Spinner />

        <View style={styles.bottomRowView}>
          <PixelButton buttonStyle={{width: 140}}>
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
  }
}

const mapDispatchToProps = { newOpponent }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom2);
