import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { newOpponent } from '../../../store/userReducer';
import { Typography, Views } from '../../../styles';

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  alertText: {
    ...Typography.alertText,
  },
  alertTextHidden: {
    ...Typography.alertText,
    opacity: 0
  },
  gamecodeTextInput: {
    ...Typography.input,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  closeModalButton: {
    height: 30,
    width: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  closeModalButtonText: {
    fontWeight: 'bold',
  },
})

function PrivateGame(props) {

  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState(false);
  const [validGamecodes, setValidGamecodes] = useState([]);
  const [goButton, setGoButton] = useState(false);


  useEffect(() => {

    props.socket.emit('inJoinGame', null)

    const receiveAvailableGames = allGames => {
      let filteredGames = [];

      for (let game in allGames) {

        let currentGame = allGames[game];

        if (currentGame.publicOrPrivate === 'private') {
          filteredGames.push(currentGame.gameCode)
        }
      }
      setValidGamecodes(filteredGames)
    }

    props.socket.on('sendAvailGameInfo', receiveAvailableGames)

    return () => {
      props.socket.off('sendAvailGameInfo', receiveAvailableGames);
    }

  }, [])

  const handleChange = (value) => {

    // value is the user-entered game code 
    setGameCode(value);

    if (value.length === 5) {

      if (!validGamecodes.includes(value)) {
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 1500)
      } else {
        setGoButton(true)
      }

    }
  }



  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'private'}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
    >

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView>
          <View
            style={styles.modalView}
          >
            <View style={styles.topBar}>

              <Text style={styles.text}>JOIN a private game here!!</Text>

              <Pressable
                style={styles.closeModalButton}
                onPress={() => props.setModalVisible(null)}
              >
                <Text style={styles.closeModalButtonText}>X</Text>
              </Pressable>

            </View>

            {!goButton &&
              <Input
                placeholder='Enter code'
                style={styles.gamecodeTextInput}
                onChangeText={value => handleChange(value)}
                maxLength={5}
              />}
            <Text style={styles[error ? 'alertText' : 'alertTextHidden']}>Invalid code, please try again </Text>

            {goButton &&
              <Pressable
                onPress={() => {
                  props.socket.emit('joinTwoPlayer', [gameCode, props.username]);
                }}>
                <Text>Go!</Text>
              </Pressable>}
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateGame);
