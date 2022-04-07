import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet, Alert } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { connect } from 'react-redux';

import { Buttons, Views, Typography } from '../../styles';

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

  useEffect(() => {

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)
    props.socket.on('couldNotJoinPlayers', redirectGameJoinerToLobby)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
      props.socket.off('couldNotJoinPlayers', redirectGameJoinerToLobby)
    }

  }, [])

  return (
    <View>
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
        <Pressable
          style={styles.HowToPlayModalButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text>How To Play</Text>
        </Pressable>


        <Text>We have alerted your opponent, please wait a moment...</Text>

        <ActivityIndicator
          color='red'
          size='large'
          animating={true} />


        <Link to='/'>
          <Text>(Go Home)</Text>
        </Link>

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
