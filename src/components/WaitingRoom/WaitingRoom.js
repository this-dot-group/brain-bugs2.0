import React, { useState } from 'react'
import { View, Text, ActivityIndicator, Pressable } from 'react-native'
import { Link } from 'react-router-native';
import Clipboard from 'expo-clipboard';
import faker from 'faker'

import styles from '../../styles/styles'



// Build Alert to notify players

const WaitingRoom = () => {

  console.log('IN THE WAITING ROOM')

  const [gameCode, setGameCode] = useState(false)
  const [copied, setCopied] = useState(false);

  const createPrivateGame = () => {
    let code = faker.random.number();
    while (code.toString().length !== 5) {
      code = faker.random.number()
    }
    console.log('code', code)

    setGameCode(code);

  }

  const handleCodeCopy = () => {
    Clipboard.setString(gameCode);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  




  return (
    <View>
      <Text>Waiting for 1 more player...</Text>

      <ActivityIndicator
        color='red'
        size='large'
        animating={true} />

      {/* <Pressable
        style={styles.openButton}
        onPress={createPrivateGame}>
        <Text>Create Private Game</Text>
      </Pressable> */}
      {!gameCode ?
        <Pressable
          style={styles.openButton}
          onPress={createPrivateGame}>
          <Text>Create Private Game</Text>
        </Pressable> 
        :
        <Pressable
          style={styles.openButton}
          onPress={handleCodeCopy}>
          <Text>{gameCode}</Text>
        </Pressable>}
      {copied && <Text style={{ color: 'red' }}> Copied </Text>}

      <Link to='/'>
        <Text>(Go Home)</Text>
      </Link>
    </View>
  )
}

export default WaitingRoom
