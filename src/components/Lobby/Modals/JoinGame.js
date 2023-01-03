import React, { useState } from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, PixelButton, TitleBar } from '../../Shared';
import { Typography } from '../../../styles';

function JoinGame(props) {

  const [ redirectToWaitingRoom2, setRedirectToWaitingRoom2 ] = useState(false)

  const styles = StyleSheet.create({
    innerText: {
      ...Typography.innerText[props.screenDeviceWidth]
    }
  })

  return (
    <GenericModal
      visible={props.modalVisible === 'join'}
    >
      <TitleBar
        cb={() => props.setModalVisible(null)}
        deviceSize={props.screenDeviceWidth}
      >
        Join a Game
      </TitleBar>
  
      {props.gamesWaiting.map((gameObj, i) =>

        <PixelButton
          key={i}
          buttonStyle={{width: 500, marginLeft: 'auto', marginRight: 'auto'}}
        >
          <Pressable
            onPress={() => {
              props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username, gameObj.gameMakerPushToken]);

              if(gameObj.gameMakerPushToken !== null){
                setRedirectToWaitingRoom2(true);
              }
            }}
            style={{height: '100%', width: '100%'}}
          >
            <Text style={styles.innerText}>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
          </Pressable>
        </PixelButton>
      )}

      {!props.gamesWaiting.length && 
        <Text style={styles.innerText}>No available games yet...</Text>
      }

      {redirectToWaitingRoom2 && <Redirect to='/waitingroom2' />}
    </GenericModal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

