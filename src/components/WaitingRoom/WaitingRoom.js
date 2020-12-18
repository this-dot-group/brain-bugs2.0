import React, { useState } from 'react'
import { View, Text, ActivityIndicator, Pressable } from 'react-native'
import { Link } from 'react-router-native';
import Clipboard from 'expo-clipboard';

import styles from '../../styles/styles'



// Build Alert to notify players

const WaitingRoom = () => {

  console.log('IN THE WAITING ROOM')

  const [ gameCode, setGameCode ] = useState('')


  const createPrivateGame = () => {
    setGameCode('12345')
  }
  
  const handleCodeCopy = () => {
    Clipboard.setString(gameCode);
  }

  // when clicked, gamecode saves to clipboard. want to make sure second pressable doesnt show until there is a gamecode, also there should be an alert to the user that the code was copied


  return (
    <View>
      <Text>Waiting for 1 more player...</Text>

      <ActivityIndicator 
        color='red'
        size='large'
        animating={true}/>

      <Pressable
        style={styles.openButton}
        onPress={createPrivateGame}>
        <Text>Create Private Game</Text>
      </Pressable>

      <Pressable
        style={styles.openButton}
        onPress={handleCodeCopy}>
        <Text>{gameCode}</Text>
      </Pressable>


      <Link to='/'>
          <Text>(Go Home)</Text>
        </Link>
    </View>
  )
}

export default WaitingRoom
