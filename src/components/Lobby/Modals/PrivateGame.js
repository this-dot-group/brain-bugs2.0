import React, { useState } from 'react'
import { View, Text, Modal, Pressable, TextInput } from 'react-native'
import { Input } from 'react-native-elements';
import { Link } from 'react-router-native';
import styles from '../../../styles/styles';

function PrivateGame(props) {

  const [ gameCode, setGameCode ]= useState('')






  return (
    <Modal
        transparent={true}
        visible={props.modalVisible === 'private'}
        >
          <View
            style={styles.modalView}
          >
            <Text>JOIN a private game here!!</Text>
            <Text>Enter Code</Text>


            <Input
              placeholder={'code here'}
              style={styles.input}
              onChangeText={value =>  setGameCode(value)}
            />

            <Link to='/howtoplay'>
              <Text>Go!</Text>
            </Link>

            {  console.log('GAME CODE: ', gameCode)}
            


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

export default PrivateGame
