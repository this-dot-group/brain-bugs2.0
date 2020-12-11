import React from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import styles from '../../../styles/styles'

function PrivateGame(props) {
  return (
    <Modal
        transparent={true}
        visible={props.modalVisible === 'private'}
        >
          <View
            style={styles.modalView}
          >
            <Text>JOIN a private game here!!</Text>
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
