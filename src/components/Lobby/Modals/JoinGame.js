import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import { Link, Redirect } from 'react-router-native'
import { newOpponent } from '../../../store/userReducer';
import styles from '../../../styles/styles'
import { connect } from 'react-redux';

function JoinGame(props) {

  // const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false)

  // useEffect(() => {

  //   props.socket.emit('inJoinGame', null)
  //   props.socket.on('sendAvailGameInfo', allGames => {
  //     console.log('username', props.username)
  //     console.log('all games', allGames);

  //     let filteredGames = [];

  //     for (let game in allGames) {

  //       let currentGame = allGames[game];

  //       if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

  //         let relevantInfo = {
  //           category: currentGame.category.name,
  //           player: currentGame.userName,
  //           gameCode: currentGame.gameCode
  //         }
  //         filteredGames.push(relevantInfo)
  //       }
  //     }
  //     setGamesWaiting(filteredGames)
  //   })
  useEffect(() => {
    const redirectToHowToPlay = usernames => {
      // In this gameplay route, the opponent is the game maker, because we are on the join
      // game screen, the user is the game joiner, as opposed to gameplay route from waiting
      // room
      props.newOpponent(usernames.gameMaker)
      setRoomJoin(true);
    }

    props.socket.on('redirectToHowToPlay', redirectToHowToPlay);

    return () => props.socket.off('redirectToHowToPlay', redirectToHowToPlay);
  }, [])



  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'join'}
    >

      <View
        style={styles.modalView}
      >
        <Text>JOIN a game here!!</Text>
        {/* {console.log('games waiting', props.gamesWaiting)} */}
        {props.gamesWaiting.map((gameObj, i) =>
          
          <Pressable
            style={styles.openButton}
            key={i}
            onPress={() => props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username])}
          >
            {/* <Link to='/howtoplay'> */}
            <Text>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
            {/* </Link>  */}
          </Pressable>


        )}



        <Pressable
          style={styles.openButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
      </View>
      {roomJoin &&
        <Redirect to='/howtoplay' />
      }
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

