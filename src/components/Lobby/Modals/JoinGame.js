import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { Link, Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { Buttons, Views } from '../../../styles';

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  gameJoinButton: {
    ...Buttons.openButton,
  },
  closeModalButton: {
    ...Buttons.openButton,
  }
})

function JoinGame(props) {

  const [ redirectToWaitingRoom2, setRedirectToWaitingRoom2 ] = useState(false)
  // const [ backToLobby, setBackToLobby ] = useState(false)

  // const invalidPushTokenRedirect = () => {
  //   Alert.alert(
  //     "Oh no!",
  //     `We were unable to connect your game.`,
  //     [
  //       {
  //         text: "Back to Lobby",
  //         onPress: () => setBackToLobby(true),
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // }

  // useEffect(() => {

  //   props.socket.on('invalidPushTokenRedirect', invalidPushTokenRedirect)

  //   return () => {
  //     props.socket.off('invalidPushTokenRedirect', invalidPushTokenRedirect)
  //   }


  // }, [])

  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'join'}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
    >

<SafeAreaView style={{flex: 1}}>

<ScrollView>

      <View
        style={styles.modalView}
      >
        <Text>JOIN a game here!!</Text>
        
        {props.gamesWaiting.map((gameObj, i) =>

          
          <Pressable
            style={styles.gameJoinButton}
            key={i}
            onPress={() => {
              props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username, gameObj.gameMakerPushToken]);
              setRedirectToWaitingRoom2(true);
            }}
          >
            <Text>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
          </Pressable>
        )}



        <Pressable
          style={styles.closeModalButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>

        {redirectToWaitingRoom2 && <Redirect to='/waitingroom2' />}
        {/* {backToLobby && <Redirect to='/lobby' />} */}

      </View>
      </ScrollView>
        </SafeAreaView>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

