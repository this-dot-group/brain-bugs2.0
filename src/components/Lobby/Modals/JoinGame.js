import React, { useState } from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, PixelButton } from '../../Shared';
import TitleBar from './TitleBar';

const styles = StyleSheet.create({
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 16
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

        <PixelButton buttonStyle={{width: 500}}>
          <Pressable
            key={i}
            onPress={() => {
              props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username, gameObj.gameMakerPushToken]);

              setRedirectToWaitingRoom2(true);
            }}
          >
            <Text style={styles.innerText}>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
          </Pressable>
        </PixelButton>
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

