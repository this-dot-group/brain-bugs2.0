import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { newOpponent } from '../../../store/userReducer';
import { Typography } from '../../../styles';
import { GenericModal } from '../../Shared';
import TitleBar from './TitleBar';
import { PixelButton } from '../../Shared';

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
    textAlign: 'center'
  },
  goRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 10
  },
})

function PrivateGame(props) {

  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState(false);
  const [validGamecodes, setValidGamecodes] = useState([]);
  const [showGo, setShowGo] = useState(false);


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
        setShowGo(true)
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

      <Input
        placeholder='Enter code'
        style={styles.gamecodeTextInput}
        onChangeText={value => handleChange(value)}
        maxLength={5}
        value={gameCode}
        disabled={showGo}
      />
  
      <Text style={styles[error ? 'alertText' : 'alertTextHidden']}>Invalid code, please try again </Text>

      <View style={styles.goRow}>
        <PixelButton
          buttonStyle={{
            opacity: showGo ? 1 : 0,
          }}
          onPress={() => props.socket.emit('joinTwoPlayer', [gameCode, props.username])}
          variant='go'
        />
      </View>
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
