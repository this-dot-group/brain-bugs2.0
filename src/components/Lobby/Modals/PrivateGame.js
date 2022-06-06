import React, { useState, useEffect } from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { newOpponent } from '../../../store/userReducer';
import { Typography } from '../../../styles';
import { GenericModal } from '../../Shared';
import TitleBar from './TitleBar';

const styles = StyleSheet.create({
  alertText: {
    ...Typography.alertText,
  },
  alertTextHidden: {
    ...Typography.alertText,
    opacity: 0
  },
  gamecodeTextInput: {
    ...Typography.input,
  }
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
    <GenericModal
      visible={props.modalVisible === 'private'}
    >
      <TitleBar
        cb={() => props.setModalVisible(null)}
      >
        JOIN a private game here!!
      </TitleBar>

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
    </GenericModal>
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
