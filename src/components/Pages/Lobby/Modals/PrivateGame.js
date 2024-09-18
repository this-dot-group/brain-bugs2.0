import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements';
import { connect } from 'react-redux'
import { newOpponent } from '../../../../store/userReducer';
import { Typography } from '../../../../styles';
import { GenericModal, Hider, TitleBar, PixelPressable } from '../../../Shared';
import { brightGreen, yellow } from '../../../../styles/colors';

const gameCodeStates = {
  INVALID_CODE: 'INVALID_CODE',
  SHOW_GO: 'SHOW_GO',
  WAITING_FOR_GAME_MAKER: 'WAITING_FOR_GAME_MAKER',
  ERROR_CODE: 'ERROR_CODE',
};

function PrivateGame({
  screenDeviceWidth,
  socket,
  setModalVisible,
  modalVisible,
  username,
  privateGames,
  privateGamesWithInactiveMaker,
}) {
  const [gameCode, setGameCode] = useState('');
  const [gameCodeState, setGameCodeState] = useState(gameCodeStates.INVALID_CODE);

  const styles = StyleSheet.create({
    alertText: {
      ...Typography.alertText[screenDeviceWidth],
      fontFamily: 'VT323',
    },
    goRow: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      paddingHorizontal: 10,
      position: 'absolute',
      bottom: 60,
    },
    goRowInner: {
      position: 'absolute',
      right: 20,
      width: '15%',
      alignItems: 'flex-end'
    },
    inputContainer: {
      width: '50%',
      alignSelf: 'center',
      paddingHorizontal: 0,
      height: '40%'
    },
    input: {
      borderBottomColor: brightGreen.hex,
      position: 'absolute',
      bottom: 0,
      height: '40%',
      width: '100%'
    },
    inputText: {
      ...Typography.inputText[screenDeviceWidth],
    },
    waitingText: {
      ...Typography.waitingText[screenDeviceWidth],
    }
  });

  const errorMessage = () => {
    setGameCodeState(gameCodeStates.ERROR_CODE);
    setTimeout(() => {
      setGameCodeState(gameCodeStates.INVALID_CODE);
      setGameCode('');
    }, 2 * 1000);
  }

  useEffect(() => {
    if (gameCode.length < 5) return;

    if (!privateGames.has(gameCode)) {
      errorMessage();
      return;
    }

    if (privateGamesWithInactiveMaker.has(gameCode)) {
      setGameCodeState(gameCodeStates.WAITING_FOR_GAME_MAKER);
      return;
    }

    setGameCodeState(gameCodeStates.SHOW_GO);
  }, [privateGamesWithInactiveMaker, gameCode, privateGames]);

  const closeModal = () => {
    setModalVisible(null);
    setGameCode('');
    setGameCodeState(gameCodeStates.INVALID_CODE);
  }

  return (
    <GenericModal
      visible={modalVisible === 'private'}
      disableBackground
    >
      <TitleBar
        cb={closeModal}
        deviceSize={screenDeviceWidth}
      >
        Join a Private Game
      </TitleBar>
      <Input
        placeholder='Enter code'
        onChangeText={setGameCode}
        maxLength={5}
        inputMode='numeric'
        value={gameCode}
        // disabled={gameCodeState === gameCodeStates.SHOW_GO}
        placeholderTextColor={yellow.hex}
        style={styles.inputText}
        containerStyle={styles.inputContainer}
        inputContainerStyle={styles.input}
      />

      {gameCodeState === gameCodeStates.ERROR_CODE && (
        <Text style={styles.alertText}>HIHI Invalid code, please try again!</Text>
      )}

      <View style={styles.goRow}>
        <Hider
          show={gameCodeState === gameCodeStates.SHOW_GO}
          style={styles.goRowInner}
        >
          <PixelPressable
            variant="go"
            sound="flute"
            pressableProps={{
              onPress: () => socket.emit('joinTwoPlayer', [gameCode, username])
            }}
          >
            Go
          </PixelPressable>
        </Hider>
        <Hider
          show={gameCodeState === gameCodeStates.WAITING_FOR_GAME_MAKER}
          style={styles.goRowInner}
        >
          <Text style={styles.waitingText}>Waiting for other player...</Text>
        </Hider>
      </View>
    </GenericModal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.username,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateGame);
