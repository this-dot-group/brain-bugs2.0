import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';
import { newOpponent, newGameCode } from '../../store/userReducer';
import { newGame } from '../../store/gameInfoReducer';
import { playSound } from '../../store/soundsReducer'
import { PixelPressable } from '../Shared'
import { Buttons, Typography } from '../../styles';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);
  const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false);

  const {
    screenDeviceWidth,
    username,
    socket,
    newGame,
    newGameCode,
    newOpponent,
    playSound
  } = props;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingTop: 10,
      paddingBottom: 30,
    },
    greeting: {
      ...Typography.headingOneText[screenDeviceWidth],
      marginTop: 0,
      marginBottom: 16,
    },
    optionBtns: {
      ...Buttons.listOptionBtns[screenDeviceWidth]
    },
    optionBtnLastChild: {
      marginBottom: 0,
    },
  })

  const createGameCode = () => Math.floor(Math.random() * 100000).toString().padStart(5, '0');

  useEffect(() => {

    // reset game so no info from previous games carries over
    newGame({});

    // maybe make a new game code each time coming here
    newGameCode(createGameCode());

    socket.emit('inJoinGame', null)

    const receiveAvailableGames = allGames => {

      let filteredGames = [];

      for (let game in allGames) {

        let currentGame = allGames[game];

        if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

          let relevantInfo = {
            category: currentGame.category.name,
            player: currentGame.userName,
            gameCode: currentGame.gameCode,
          }
          filteredGames.push(relevantInfo)
        }
      }
      setGamesWaiting(filteredGames)
    }
    socket.on('sendAvailGameInfo', receiveAvailableGames);

    /**
     * redirectToHowToPlay is only listened to in the case of a PRIVATE game 
     * 
     */
    const redirect = (usernames) => {
      newOpponent(usernames.gameMaker);
      setRoomJoin(true);
    }

    socket.on('redirectToHowToPlay', redirect);

    return () => {
      socket.off('sendAvailGameInfo', receiveAvailableGames);
      socket.off('redirectToHowToPlay', redirect);
    }
  }, []);

  const handleModalChange = (modalVisible) => {
    playSound('click')
    setModalVisible(modalVisible)
  }

  return (
    <View style={styles.container}>
      {username && (
        <Text style={styles.greeting}>WELCOME {username.toUpperCase()}!</Text>
      )}

      <PixelPressable
        buttonStyle={styles.optionBtns}
        pressableProps={{ onPress: () => handleModalChange('start') }}
      >Start a Game</PixelPressable>
      <StartGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />

      <PixelPressable
        buttonStyle={styles.optionBtns}
        pressableProps={{ onPress: () => handleModalChange('join') }}
      >Join Existing Game</PixelPressable>
      <JoinGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
        gamesWaiting={gamesWaiting}
      />

      <PixelPressable
        buttonStyle={{...styles.optionBtns, ...styles.optionBtnLastChild}}
        pressableProps={{ onPress: () => handleModalChange('private') }}
      >Join Private Game</PixelPressable>
      <PrivateGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />

      {roomJoin &&
        <Redirect to='/howtoplay' />
      }

      <SettingsDrawer />
    </View>
  )
}



const mapStateToProps = (state) => {
  return {
    username: state.username,
    socket: state.socketReducer,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
const mapDispatchToProps = { newOpponent, newGame, newGameCode, playSound }

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
