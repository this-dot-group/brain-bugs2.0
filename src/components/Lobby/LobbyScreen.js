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

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingVertical: 60,
    paddingHorizontal: 60,
  },
  muteButton: {
    alignSelf: 'flex-end',
    marginBottom: 0,
    marginTop: 'auto'
  },
  greeting: {
    fontFamily: 'VT323',
    marginBottom: 20,
    fontSize: 54
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  }
})

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);

  const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false);

  const createGameCode = () => Math.floor(Math.random() * 100000).toString().padStart(5, '0');

  useEffect(() => {
    // reset game so no info from previous games carries over
    props.newGame({});

    // maybe make a new game code each time coming here
    props.newGameCode(createGameCode());

    props.socket.emit('inJoinGame', null)

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
    props.socket.on('sendAvailGameInfo', receiveAvailableGames);

    /**
     * redirectToHowToPlay is only listened to in the case of a PRIVATE game 
     * 
     */
    const redirect = (usernames) => {
      props.newOpponent(usernames.gameMaker);
      setRoomJoin(true);
    }

    props.socket.on('redirectToHowToPlay', redirect);

    return () => {
      props.socket.off('sendAvailGameInfo', receiveAvailableGames);
      props.socket.off('redirectToHowToPlay', redirect);
    }
  }, []);

  const handleModalChange = (modalVisible) => {
    props.playSound('click')
    setModalVisible(modalVisible)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.greeting}> WELCOME {props.userName.toUpperCase()}! </Text>

      <PixelButton buttonStyle={{marginBottom: 24}}>
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

      <PixelButton buttonStyle={{marginBottom: 24}}>
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

      <PixelButton>
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
    socket: state.socketReducer
  }
}
const mapDispatchToProps = { newOpponent, newGame, newGameCode, playSound }

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
