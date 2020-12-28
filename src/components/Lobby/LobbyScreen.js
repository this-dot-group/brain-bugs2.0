import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';
import styles from '../../styles/styles'

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
      <StartGameModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible('join')}
      >
        <Text> Join a Game </Text>  
      </Pressable>
      <JoinGameModal 
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible('private')}
      >
        <Text> Join Private Game </Text>
      </Pressable>
      <PrivateGameModal 
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
    </View>
  )
}



const mapStateToProps = (state) => {
  return { userName: state.userReducer.username,
           socket: state.socketReducer
          }
}

export default connect(mapStateToProps)(StartScreen)
