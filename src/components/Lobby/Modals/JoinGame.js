import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal } from '../../Shared';

const styles = StyleSheet.create({
  gameJoinButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  closeModalButton: {
    height: 30,
    width: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  closeModalButtonText: {
    fontWeight: 'bold',
  }
})

function JoinGame(props) {

  const [ redirectToWaitingRoom2, setRedirectToWaitingRoom2 ] = useState(false)


  return (
    <GenericModal
      visible={props.modalVisible === 'join'}
    >
      <View style={styles.topBar}>

        <Text style={styles.text}>JOIN a game here!!</Text>

        <Pressable
          style={styles.closeModalButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text style={styles.closeModalButtonText}>X</Text>
        </Pressable>

      </View>
  
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

      {!props.gamesWaiting.length && 
        <Text>No available games</Text>
      }

      {redirectToWaitingRoom2 && <Redirect to='/waitingroom2' />}
    </GenericModal>
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

