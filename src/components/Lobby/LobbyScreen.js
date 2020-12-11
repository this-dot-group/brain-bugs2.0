import React from 'react';
import { View, Text, Pressable, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import JoinGame from './Modals/JoinGame';
import PrivateGame from './Modals/PrivateGame';
import StartGame from './Modals/StartGame';

function StartScreen(props) {

  return (
    <View>
      <Text> Welcome {props.userName}! </Text>
      <Text> Short explanation of options below </Text>
      <TouchableHighlight>
        <Text> Start a Game </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text> Join a Game </Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text> Join Private Game </Text>
      </TouchableHighlight>
    </View>
  )
}

const mapStateToProps = (state) => {
  // console.log('state', state)
  return { userName: state.usernameReducer }
}

export default connect(mapStateToProps)(StartScreen)
