import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'
import { connect } from 'react-redux';

import { Buttons } from '../../styles'

const styles = StyleSheet.create({
  backToLobbyButton: {
    ...Buttons.openButton,
  },
})

function GameEnd(props) {

  const [backToLobby, setBackToLobby] = useState(false);

  const playerOneName = props.location.state.finalScore.playerOne.name
  const playerOneScore = props.location.state.finalScore.playerOne.score
  const playerTwoName = props.location.state.finalScore.playerTwo.name
  const playerTwoScore = props.location.state.finalScore.playerTwo.score

  useEffect(() => {
    console.log('final score on end screen', props.location.state.finalScore);
  })

  const leaveRoomAndGoToLobby = () => {

    props.socket.emit('leaveRoom');
    if(props.numPlayers === 1) {
      props.fakeOpponentSocket.emit('leaveRoom');
    }
    setBackToLobby(true);
  }

  return (
    <View>
      <Text> Game End </Text>
      <Text>{playerOneName} {playerOneScore}</Text>
      <Text>{playerTwoName} {playerTwoScore}</Text>
      <Pressable
        style={styles.backToLobbyButton}
        onPress={leaveRoomAndGoToLobby}
      >
        <Text>Back to Lobby</Text>
      </Pressable>
      {backToLobby && <Redirect to='/lobby' />}
    </View>
  )
}

const mapStateToProps = state => ({
  numPlayers: state.gameInfoReducer.numPlayers,
  socket: state.socketReducer,
  fakeOpponentSocket: state.fakeOpponentSocketReducer,
})

export default connect(mapStateToProps)(GameEnd);
