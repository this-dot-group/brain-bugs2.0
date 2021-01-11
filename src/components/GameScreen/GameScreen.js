import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Modal } from 'react-native'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';

import { connect } from 'react-redux';


import styles from '../../styles/styles'


function GameScreen(props) {


  useEffect(() => {

    props.socket.emit('readyForGame');
    props.socket.on('question', questionObj => {
      console.log('questionObj in question event', questionObj);
    })

  }, [])

  const [modalVisible, setModalVisible] = useState(false)



  return (
    <View>
      <Text>GAME PLAY SCREEN </Text>




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

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(GameScreen);
