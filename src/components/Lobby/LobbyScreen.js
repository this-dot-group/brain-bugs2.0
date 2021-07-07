import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';
import { newOpponent } from '../../store/userReducer';
import { newGame } from '../../store/gameInfoReducer';

import { Buttons } from '../../styles';
import usePlaySound from '../../sounds/usePlaySound'

const styles = StyleSheet.create({
  gameOptionButtons: {
    ...Buttons.openButton,
  }
})

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);

  const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false);

  const { playSound } = usePlaySound(['flute', 'click'])

  useEffect(() => {
    // reset game so no info from previous games carries over
    props.newGame({});
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
     * Redirect for both the join game modal and private game modal
     * Both modals end up emitting an event that triggers the server to send 'redirectToHowToPlay',
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
    playSound('click')
    setModalVisible(modalVisible)
  }

  return (
    <View>
      <Text> Welcome {props.userName}! </Text>
      <Text> Short explanation of options below </Text>
      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => handleModalChange('start')}
      >
        <Text> Start a Game </Text>
      </Pressable>
      <StartGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />

      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => handleModalChange('join')}
      >
        <Text> Join a Game </Text>
      </Pressable>
      <JoinGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
        gamesWaiting={gamesWaiting}
      />

      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => handleModalChange('private')}
      >
        <Text> Join Private Game </Text>
      </Pressable>
      <PrivateGameModal
        setModalVisible={handleModalChange}
        modalVisible={modalVisible}
      />
      {roomJoin &&
        <Redirect to='/howtoplay' />
      }
    </View>
  )
}



const mapStateToProps = (state) => {
  return {
    userName: state.userReducer.username,
    socket: state.socketReducer
  }
}
const mapDispatchToProps = { newOpponent, newGame }

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
