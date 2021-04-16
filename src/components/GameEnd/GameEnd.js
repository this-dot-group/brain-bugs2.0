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

  const [showInvitation, setShowInvitation] = useState(false);

  const playerOneName = props.location.state.finalScore.playerOne.name
  const playerOneScore = props.location.state.finalScore.playerOne.score
  const playerTwoName = props.location.state.finalScore.playerTwo.name
  const playerTwoScore = props.location.state.finalScore.playerTwo.score

  useEffect(() => {
    props.socket.on('rematchInvitation', onRematchInvitation);
    props.socket.on('opponentRematchResponse', onRematchResponse)
    return () => {
      props.socket.off('rematchInvitation', onRematchInvitation)
      props.socket.off('opponentRematchResponse', onRematchResponse)
    }


  }, [])

  const onRematchInvitation = () => {
    setShowInvitation(true)
  }

  const onRematchResponse = (response) => {

    console.log('response in onRematchResponse', response)
    // if response false, setBackToLobby(true);

    response ? console.log('FIGURE OUT HOW TO START NEW GAME WITH BOTH PLAYERS, SAME CATEGORY AND SAME NUM QUESTIONS') : setBackToLobby(true)

    // if true, START A NEW GAME WITH BOTH PLAYERS. same category and # questions

  }





  const handleRematch = () => {
    props.socket.emit('rematch')

    // indicator for requestor
  };

  const handleYes = () => {
    props.socket.emit('rematchResponse', true)
  }

  const handleNo = () => {
    props.socket.emit('rematchResponse', false)
    leaveRoomAndGoToLobby();

  }

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

      <Pressable style={styles.backToLobbyButton} onPress={handleRematch}>
        {/* <Link to='/howtoplay'> */}
          <Text>Rematch</Text>
        {/* </Link> */}
      </Pressable>

      {backToLobby && <Redirect to='/lobby' />}

      {showInvitation && 
      <>
        <Text>{props.opponent} wants a rematch! What do you think?</Text>
        <Pressable
        style={styles.backToLobbyButton}
        onPress={handleYes}
      >
        <Text>Yes</Text>
      </Pressable>
            <Pressable
            style={styles.backToLobbyButton}
            onPress={handleNo}
          >
            <Text>No</Text>
          </Pressable>
          </>}

    </View>
  )
}

const mapStateToProps = state => ({
  numPlayers: state.gameInfoReducer.numPlayers,
  socket: state.socketReducer,
  fakeOpponentSocket: state.fakeOpponentSocketReducer,
  opponent: state.userReducer.opponent
})

export default connect(mapStateToProps)(GameEnd);

