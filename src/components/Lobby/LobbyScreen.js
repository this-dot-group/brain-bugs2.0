import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import JoinGameModal from './Modals/JoinGame';
import PrivateGameModal from './Modals/PrivateGame';
import StartGameModal from './Modals/StartGame';

import { Buttons } from '../../styles';

const styles = StyleSheet.create({
  gameOptionButtons: {
    ...Buttons.openButton,
  }
})

function StartScreen(props) {
  const [modalVisible, setModalVisible] = useState(null);

  const [gamesWaiting, setGamesWaiting] = useState([])

  useEffect(() => {

    props.socket.emit('inJoinGame', null)
    
    const receiveAvailableGames = allGames => {
      // console.log('username', props.userName)
      // console.log('all games', allGames);

      let filteredGames = [];

      for (let game in allGames) {

        let currentGame = allGames[game];

        if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

          let relevantInfo = {
            category: currentGame.category.name,
            player: currentGame.userName,
            gameCode: currentGame.gameCode
          }
          filteredGames.push(relevantInfo)
        }
      }
      setGamesWaiting(filteredGames)
    }
    props.socket.on('sendAvailGameInfo', receiveAvailableGames);
    // props.socket.on('sendAvailGameInfo', allGames => {
    //   // console.log('username', props.userName)
    //   // console.log('all games', allGames);

    //   let filteredGames = [];

    //   for (let game in allGames) {

    //     let currentGame = allGames[game];

    //     if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

    //       let relevantInfo = {
    //         category: currentGame.category.name,
    //         player: currentGame.userName,
    //         gameCode: currentGame.gameCode
    //       }
    //       filteredGames.push(relevantInfo)
    //     }
    //   }
    //   setGamesWaiting(filteredGames)
    // })
    return () => props.socket.off('sendAvailGameInfo', receiveAvailableGames);
  }, []);

  return (
    <View>
      <Text> Welcome {props.userName}! </Text>
      <Text> Short explanation of options below </Text>
      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => setModalVisible('start')}
      >
        <Text> Start a Game </Text>
      </Pressable>
      <StartGameModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => setModalVisible('join')}
      >
        <Text> Join a Game </Text>  
      </Pressable>
      <JoinGameModal 
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        gamesWaiting={gamesWaiting}
      />

      <Pressable
        style={styles.gameOptionButtons}
        onPress={() => setModalVisible('private')}
      >
        <Text> Join Private Game </Text>
      </Pressable>
      <PrivateGameModal 
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
    </View>
  )
}



const mapStateToProps = (state) => {
  return { userName: state.userReducer.username,
           socket: state.socketReducer
          }
}

export default connect(mapStateToProps)(StartScreen)
