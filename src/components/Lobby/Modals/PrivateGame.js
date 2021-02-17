import React, { useState, useEffect } from 'react'
import { View, Text, Modal, Pressable, TextInput } from 'react-native'
import { Input } from 'react-native-elements';
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import { newOpponent } from '../../../store/userReducer';

import styles from '../../../styles/styles';

function PrivateGame(props) {

  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState(false);
  const [validGamecodes, setValidGamecodes] = useState([]);
  const [goButton, setGoButton] = useState(false);
  const [roomJoin, setRoomJoin] = useState(false);


  useEffect(() => {

    props.socket.emit('inJoinGame', null)
    props.socket.on('sendAvailGameInfo', allGames => {

      let filteredGames = [];

      for (let game in allGames) {

        let currentGame = allGames[game];

        if (currentGame.publicOrPrivate === 'private') {
          filteredGames.push(currentGame.gameCode)
        }
      }
      setValidGamecodes(filteredGames)
      // console.log('filteredGames in PRIVATE GAME screen:  ', filteredGames)
    })
    props.socket.on('redirectToHowToPlay', usernames => {
      props.newOpponent(usernames.gameMaker)
      setRoomJoin(true);
    });

  }, [])

  const handleChange = (value) => {

    // value is the user-entered game code 
    setGameCode(value);

    // console.log('validGameCodes in PRIVATE SCREEN:  ', validGamecodes)

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
    >
      <View
        style={styles.modalView}
      >
        <Text>JOIN a private game here!!</Text>
        <Text>Enter Code</Text>

        {!goButton &&
          <Input
            placeholder='code here'
            style={styles.input}
            onChangeText={value => handleChange(value)}
            maxLength={5}
          />}

        {error && <Text style={styles.alertText}>Invalid code, please try again </Text>}

        {goButton &&
          <Pressable
            onPress={() => {
              props.socket.emit('joinTwoPlayer', [gameCode, props.username]);
              // console.log('gameCode', gameCode)
            }}>
            <Text>Go!</Text>
          </Pressable>}

        {/* {  console.log('GAME CODE: ', gameCode)} */}



        <Pressable
          style={styles.openButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
        {roomJoin &&
          <Redirect to='/howtoplay' />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateGame);
