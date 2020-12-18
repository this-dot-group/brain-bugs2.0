import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link } from 'react-router-native';


//Import Timer from Server


function HowToPlay() {
  return (
    <View>
      <Text> HOW TO PLAY screen with countdown </Text> 

    <Pressable>

      <Link to='/'>
        <Text>Go Home</Text>
      </Link>
    </Pressable>
    </View>
  )
}

export default HowToPlay
