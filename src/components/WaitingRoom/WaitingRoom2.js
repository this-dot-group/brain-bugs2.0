import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet } from 'react-native'
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

  useEffect(() => {

    const redirectToHowToPlay = usernames => {
      props.newOpponent(usernames.gameJoiner)
      setRoomJoin(true);
    }

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay)

    return () => {
      props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
    }

  }, [])

  return (
    <View>
        <Modal
          transparent={true}
          visible={modalVisible}>

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


        <Text>Waiting for push notification biz...</Text>

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
