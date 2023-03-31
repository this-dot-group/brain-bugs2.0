import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, PixelPressable, TitleBar } from '../../Shared';
import { Typography } from '../../../styles';

function JoinGame(props) {
  const styles = StyleSheet.create({
    innerText: {
      ...Typography.innerText[props.screenDeviceWidth]
    },
    smallInnerText: {
      ...Typography.smallInnerText[props.screenDeviceWidth]
    }
  });

  const handleJoinTwoPlayer = gameObj => {
    props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username]);
  }

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
        <PixelPressable
          key={i}
          buttonStyle={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}
          pressableProps={{ onPress: () => handleJoinTwoPlayer(gameObj) }}
        >
          <Text style={styles.smallInnerText}>
            {gameObj.player} is waiting to play {gameObj.category}
          </Text>
        </PixelPressable>
      )}

      {!props.gamesWaiting.length && 
        <Text style={styles.innerText}>No available games yet...</Text>
      }

    </GenericModal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.username,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

