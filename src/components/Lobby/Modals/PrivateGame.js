import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { newOpponent } from '../../../store/userReducer';
import { Typography } from '../../../styles';
import { GenericModal, Hider, TitleBar, PixelPressable } from '../../Shared';

function PrivateGame(props) {
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState(false);
  const [validGamecodes, setValidGamecodes] = useState([]);
  const [showGo, setShowGo] = useState(false);

  const styles = StyleSheet.create({
    alertText: {
      ...Typography.alertText[props.screenDeviceWidth],
    },
    goRow: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      paddingHorizontal: 10
    },
    inputText: {
      ...Typography.inputText[props.screenDeviceWidth]
    }
  })


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
        deviceSize={props.screenDeviceWidth}
      >
        Join a Private Game
      </TitleBar>
      <Input
        placeholder='Enter code'
        style={styles.inputText}
        onChangeText={value => handleChange(value)}
        maxLength={5}
        value={gameCode}
        disabled={showGo}
        containerStyle={{width: '50%', alignSelf: 'center'}}
      />
  
      <Hider
        show={error}
      >
        <Text style={styles.alertText}>Invalid code, please try again! </Text>
      </Hider>

      <View style={styles.goRow}>
        <Hider
          show={showGo}
        >
          <PixelPressable
            variant="go"
            pressableProps={{
              onPress: () => props.socket.emit('joinTwoPlayer', [gameCode, props.username])
            }}
          >
            Go
          </PixelPressable>
        </Hider>
      </View>
    </GenericModal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateGame);
