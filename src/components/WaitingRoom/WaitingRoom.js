import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'

// Build Alert to notify players

function WaitingRoom() {
  return (
    <View>
      <Text>Waiting Room Screen </Text>
      <Link to='/'>
          <Text>Go Home</Text>
        </Link>
    </View>
  )
}

export default WaitingRoom
