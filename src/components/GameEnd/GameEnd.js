import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

function GameEnd(props) {
  const playerOneName = props.location.state.finalScore.playerOne.name
  const playerOneScore = props.location.state.finalScore.playerOne.score
  const playerTwoName = props.location.state.finalScore.playerTwo.name
  const playerTwoScore = props.location.state.finalScore.playerTwo.score
  useEffect(() => {
    console.log('final score on end screen', props.location.state.finalScore);
  })
  return (
    <View>
      <Text> Game End </Text>
      <Text>{playerOneName} {playerOneScore}</Text>
      <Text>{playerTwoName} {playerTwoScore}</Text>
    </View>
  )
}

export default GameEnd
