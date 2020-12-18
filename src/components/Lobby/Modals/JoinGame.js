import React from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import styles from '../../../styles/styles'

function JoinGame(props) {


  let gamesWaiting = [
    {
      category: 'anime',
      player: 'Josh',
    },
    {
      category: 'French film',
      player: 'Tia',
    },
    {
      category: 'Bikes',
      player: 'Chris',
    }
  ];



  return (
    <Modal
    transparent={true}
    visible={props.modalVisible === 'join'}
    >
      <View
        style={styles.modalView}
      >
        <Text>JOIN a game here!!</Text>

        { gamesWaiting.map( (gameObj, i) => 

          <Pressable
            style={styles.openButton}
            key={i}>
            <Link to='/howtoplay'>
              <Text>{ gameObj.player } is waiting to play { gameObj.category } </Text>
            </Link> 
          </Pressable>

        )}

        {console.log('refreshed!!!!!')}






        <Pressable
        style={styles.openButton}
        onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
      </View>
  </Modal>
  )
}

export default JoinGame
