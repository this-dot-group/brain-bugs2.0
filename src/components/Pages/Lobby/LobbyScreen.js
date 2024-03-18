import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';
import { newOpponent, newGameCode } from '../../../store/userReducer';
import { newGame } from '../../../store/gameInfoReducer';
import { playSound } from '../../../store/soundsReducer'
import { PixelPressable } from '../../Shared'
import { Buttons, Typography } from '../../../styles';
import SettingsDrawer from '../../Shared/SettingsDrawer/SettingsDrawer';
import AnimatedView from '../../Shared/AnimatedView';
import CrawlingBugs from '../../Shared/CrawlingBugs/CrawlingBugs';

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);
  const [publicGames, setPublicGames] = useState([]);
  const [privateGames, setPrivateGames] = useState(new Set());
  const [privateGamesWithInactiveMaker, setPrivateGamesWithInactiveMaker] = useState(new Set());
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
      ...Buttons.listOptionBtns[screenDeviceWidth],
    },
    optionBtnLastChild: {
      width: Buttons.listOptionBtns[screenDeviceWidth].width + 18,
      marginBottom: 0,
    },
  })

  const createGameCode = () => Math.floor(Math.random() * 100000).toString().padStart(5, '0');

  const receiveAvailableGames = allGames => {
    const forPublic = [];
    const forPrivate = new Set();
    const inactiveMaker = new Set();

    for (let currentGame of allGames) {
      if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

        let relevantInfo = {
          category: currentGame.category.name,
          player: currentGame.userName,
          gameCode: currentGame.gameCode,
        }
        forPublic.push(relevantInfo)
      }

      if (currentGame.publicOrPrivate === 'private') {
        if (currentGame.waitingForMakerToReturn) {
          inactiveMaker.add(currentGame.gameCode);
        }
        forPrivate.add(currentGame.gameCode);
      }
    }

    setPublicGames(forPublic);
    setPrivateGames(forPrivate);
    setPrivateGamesWithInactiveMaker(inactiveMaker);
  }

  useEffect(() => {
    newGame({});

    // make a new game code each time coming here
    newGameCode(createGameCode());

    socket.emit('inJoinGame', null)

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
    <AnimatedView style={styles.container} useSite="LobbyScreen">
      <CrawlingBugs num={8} />
      {username && (
        <Text style={styles.greeting}>WELCOME {username.toUpperCase()}!</Text>
      )}

      <PixelPressable
        buttonStyle={styles.optionBtns}
        pressableProps={{ onPress: () => handleModalChange('start') }}
      >Start Game</PixelPressable>
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
        gamesWaiting={publicGames}
      />

      <PixelPressable
        buttonStyle={{...styles.optionBtns, ...styles.optionBtnLastChild}}
        pressableProps={{ onPress: () => handleModalChange('private') }}
      >Join Private Game</PixelPressable>
      <PrivateGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
        privateGames={privateGames}
        privateGamesWithInactiveMaker={privateGamesWithInactiveMaker}
      />

      {roomJoin &&
        <Redirect to='/howtoplay' />
      }

      <SettingsDrawer />
    </AnimatedView>
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
