import React, { useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import { connect } from 'react-redux';

import { Buttons } from '../../styles'

const styles = StyleSheet.create({
backToLobbyButton: {
  ...Buttons.openButton,
},
})

function GameEnd(props) {
  const playerOneName = props.location.state.finalScore.playerOne.name
  const playerOneScore = props.location.state.finalScore.playerOne.score
  const playerTwoName = props.location.state.finalScore.playerTwo.name
  const playerTwoScore = props.location.state.finalScore.playerTwo.score
  useEffect(() => {
    console.log('final score on end screen', props.location.state.finalScore);
    // console.log(props)
  })

  // Right now, rematch functionality implies same category, same num questions, same opponent.

  // When one player chooses rematch, a modal will pop up on opponent's screen "Would you like a rematch?" with a Y or N button. 

  // For the person who chose rematch, they'll see a modal that says "Waiting for other player..."

  // If opponent chooses Y, dropped back into How to Play screen with countdown

  // If opponent chooses N, they're both dropped back into Lobby, with a modal explaining "No rematch today, you're being redirected back to lobby"

  // WHAT DO I NEED AT THIS POINT, TO DO THE ABOVE?
  // - category
  // - num questions
  // - player names (already have it on finalScore state being passed down)
  // - socketIds

  const socketIdRef = props.location.state.socketIdRef;

  const handleRematch = () => {

    console.log('socketIdRef in gameplay repo:  ', socketIdRef)

    props.socket.emit('rematch', socketIdRef)

    


  };

  return (
    <View>
      <Text> Game End </Text>
      <Text>{playerOneName} {playerOneScore}</Text>
      <Text>{playerTwoName} {playerTwoScore}</Text>
      <Pressable style={styles.backToLobbyButton}>
        <Link to='/lobby'>
          <Text>Back to Lobby</Text>
        </Link>
      </Pressable>
      <Pressable style={styles.backToLobbyButton} onPress={handleRematch}>
        {/* <Link to='/howtoplay'> */}
          <Text>Rematch</Text>
        {/* </Link> */}
      </Pressable>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(GameEnd);

