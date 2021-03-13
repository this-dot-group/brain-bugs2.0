import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Pressable, Modal, StyleSheet } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import { newOpponent } from '../../store/userReducer'
import { getQuestions } from '../../store/gameInfoReducer'
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

const WaitingRoom = (props) => {

  // console.log('IN THE WAITING ROOM')

  const [modalVisible, setModalVisible] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false)

  const [copied, setCopied] = useState(false);

  // const [questions, setQuestions] = useState([]);

  const handleCodeCopy = () => {
    Clipboard.setString(props.gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  useEffect(() => {

    (async () => {
      await props.getQuestions(props.fullGameInfo.category.id, props.fullGameInfo.numQuestions)
    })()
    
  }, [])
  
  useEffect(() => {
    props.fullGameInfo.userName = props.userName;
    props.fullGameInfo.gameCode = props.gameCode;
    props.socket.emit('newGame', props.fullGameInfo)
    props.socket.on('redirectToHowToPlay', usernames => {
      props.newOpponent(usernames.gameJoiner)
      setRoomJoin(true);
    })
  },[props.fullGameInfo.liveGameQuestions])


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


      <Text>Waiting for 1 more player...</Text>

      <ActivityIndicator
        color='red'
        size='large'
        animating={true} />

      {props.publicOrPrivate === 'private' &&

        <Pressable
        style={styles.gameCodeCopyButton}
        onPress={handleCodeCopy}>
        <Text>{props.gameCode}</Text>
        </Pressable>

        }

        {copied && <Text style={styles.alertText}> Copied </Text>}  

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
  return { userName: state.userReducer.username,
           gameCode: state.userReducer.gameCode,
           socket: state.socketReducer,
           publicOrPrivate: state.gameInfoReducer.publicOrPrivate,
           fullGameInfo: state.gameInfoReducer

          }
}
const mapDispatchToProps = { newOpponent, getQuestions }

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
