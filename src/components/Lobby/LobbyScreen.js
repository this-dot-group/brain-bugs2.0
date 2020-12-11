import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { Link } from 'react-router-native'

function StartScreen (props) {
  // console.log('props', props)
  return (
    <View>
      <Text> Welcome {props.userName}! </Text> 
      <Text> Short explanation of options below </Text>
      <Text> Start a Game </Text>
      <Text> Join a Game </Text>
      <Text> Join Private Game </Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  // console.log('state', state)
  return { userName: state.usernameReducer }
}

export default connect(mapStateToProps)(StartScreen)
