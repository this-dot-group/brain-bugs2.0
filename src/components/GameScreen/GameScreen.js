import React { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';

function GameScreen() {
  return (
    <View>
      <Text>Game Screen </Text>
      <Modal
        transparent={true}
        visible={modalVisible}>

        <View
          style={styles.modalView}>
          <HowToPlayModal />
          <Pressable
            style={styles.openButton}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <Text>Hide</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
        >
        <Text>How To Play</Text>
      </Pressable>
    </View>
  )
}

export default GameScreen
