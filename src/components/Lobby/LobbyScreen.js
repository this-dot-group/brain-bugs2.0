import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import JoinGame from './Modals/JoinGame';
import PrivateGame from './Modals/PrivateGame';
import StartGame from './Modals/StartGame';

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
})

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);

  return (
    <View>
      <Text> Welcome {props.userName}! </Text>
      <Text> Short explanation of options below </Text>
      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible('start')}
      >
        <Text> Start a Game </Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible === 'start'}
        >
          <View
            style={styles.modalView}
          >
            <Text>Start a game here!!</Text>
            <Pressable
            style={styles.openButton}
            onPress={() => setModalVisible(null)}
            >

            </Pressable>
          </View>
      </Modal>

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible('join')}
      >
        <Text> Join a Game </Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible === 'join'}
        >
          <View
            style={styles.modalView}
          >
            <Text>Join a game here!!</Text>
            <Pressable
            style={styles.openButton}
            onPress={() => setModalVisible(null)}
            >

            </Pressable>
          </View>
      </Modal>

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible('private')}
      >
        <Text> Join Private Game </Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={modalVisible === 'private'}
        >
          <View
            style={styles.modalView}
          >
            <Text>Join a private game here!!</Text>
            <Pressable
            style={styles.openButton}
            onPress={() => setModalVisible(null)}
            >

            </Pressable>
          </View>
      </Modal>
    </View>
  )
}



const mapStateToProps = (state) => {
  // console.log('state', state)
  return { userName: state.usernameReducer }
}

export default connect(mapStateToProps)(StartScreen)
