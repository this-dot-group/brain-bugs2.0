import React, { useState } from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, TitleBar } from '../../Shared';

const styles = StyleSheet.create({
  gameJoinButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 20,
    alignSelf: 'center'
  }
})

function JoinGame(props) {

  const [ redirectToWaitingRoom2, setRedirectToWaitingRoom2 ] = useState(false)


  return (
    <GenericModal
      visible={props.modalVisible === 'join'}
    >
      <TitleBar
        cb={() => props.setModalVisible(null)}
      >
        JOIN a game here!!
      </TitleBar>
  
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

