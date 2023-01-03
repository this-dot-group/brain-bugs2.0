import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';
import MuteButton from '../MuteButton/MuteButton';
import { newOpponent, newGameCode } from '../../store/userReducer';
import { newGame } from '../../store/gameInfoReducer';
import { playSound } from '../../store/soundsReducer'
import PixelButton from '../Shared/PixelButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buttons, Typography } from '../../styles';

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);

  const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false);

  const {
    screenDeviceWidth,
    userName,
    socket,
    newGame,
    newGameCode,
    newOpponent,
    playSound
  } = props;

  console.log('deviceWidth in Lobby:', screenDeviceWidth)

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingVertical: 30,
      paddingHorizontal: 30,
    },
    muteButton: {
      alignSelf: 'flex-end',
      marginBottom: 0,
      marginTop: 'auto'
    },
    greeting: {
      ...Typography.headingOneText[screenDeviceWidth],
      marginBottom: 20,
    },
    optionBtns: {
      ...Buttons.lobbyOptionBtns[screenDeviceWidth]

    },
    innerText: {
      ...Typography.innerText[screenDeviceWidth],
    }
  })

  const createGameCode = () => Math.floor(Math.random() * 100000).toString().padStart(5, '0');

  const storeUsername = async () => {
    try {
      await AsyncStorage.setItem('username', userName);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    storeUsername();

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
            gameMakerPushToken: currentGame.gameMakerPushToken
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
      <Text style={styles.greeting}> WELCOME {userName.toUpperCase()}! </Text>

      <PixelButton buttonStyle={styles.optionBtns}>
        <Pressable
          onPress={() => handleModalChange('start')}
          style={{height: '100%', width: '100%'}}
        >
          <Text style={styles.innerText}>Start a Game</Text>
        </Pressable>
      </PixelButton>

      <StartGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />

      <PixelButton buttonStyle={styles.optionBtns}>
        <Pressable
          onPress={() => handleModalChange('join')}
          style={{height: '100%', width: '100%'}}
        >
          <Text style={styles.innerText}> Join Existing Game </Text>
        </Pressable>
      </PixelButton>
      <JoinGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
        gamesWaiting={gamesWaiting}
      />

      <PixelButton buttonStyle={styles.optionBtns}>
        <Pressable
          onPress={() => handleModalChange('private')}
          style={{height: '100%', width: '100%'}}
        >
          <Text style={styles.innerText}> Join Private Game </Text>
        </Pressable>
      </PixelButton>
      <PrivateGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />

      {roomJoin &&
        <Redirect to='/howtoplay' />
      }
      <MuteButton
        styles={styles.muteButton}
      />
    </View>
  )
}



const mapStateToProps = (state) => {
  return {
    userName: state.userReducer.username,
    socket: state.socketReducer,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}
const mapDispatchToProps = { newOpponent, newGame, newGameCode, playSound }

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
