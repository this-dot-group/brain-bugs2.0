import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import { Link, Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { Buttons, Views } from '../../../styles';

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  gameJoinButton: {
    ...Buttons.openButton,
  },
  closeModalButton: {
    ...Buttons.openButton,
  }
})

function JoinGame(props) {

  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'join'}
      animationType="slide"
    >

      <View
        style={styles.modalView}
      >
        <Text>JOIN a game here!!</Text>
        
        {props.gamesWaiting.map((gameObj, i) =>
          
          <Pressable
            style={styles.gameJoinButton}
            key={i}
            onPress={() => props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username])}
          >
            {/* <Link to='/howtoplay'> */}
            <Text>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
            {/* </Link>  */}
          </Pressable>


        )}



        <Pressable
          style={styles.closeModalButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
      </View>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

