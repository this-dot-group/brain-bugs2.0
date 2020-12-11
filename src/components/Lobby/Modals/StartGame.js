import React from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import styles from '../../../styles/styles'


function StartGame(props) {
  return (
    <Modal
        transparent={true}
        visible={props.modalVisible === 'start'}
        >
          <View
            style={styles.modalView}
          >
            <Text>Start a game here!!</Text>
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

export default StartGame
