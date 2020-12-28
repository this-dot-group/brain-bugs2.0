import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import { Link, Redirect } from 'react-router-native'
import styles from '../../../styles/styles'
import { connect } from 'react-redux';

function JoinGame(props) {

  const [gamesWaiting, setGamesWaiting] = useState([])
  const [roomJoin, setRoomJoin] = useState(false)

  useEffect(() => {

    props.socket.emit('inJoinGame', null)
    props.socket.on('sendAvailGameInfo', allGames => {

      let filteredGames = [];

      for (let game in allGames) {

        let currentGame = allGames[game];

        if (currentGame.publicOrPrivate === 'public' && currentGame.numPlayers === 2) {

          let relevantInfo = {
            category: currentGame.category.name,
            player: currentGame.userName,
          }
          filteredGames.push(relevantInfo)
        }
      }
      setGamesWaiting(filteredGames)
    })

    props.socket.on('redirectToHowToPlay', () => {
      setRoomJoin(true);
    })
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

        {gamesWaiting.map((gameObj, i) =>

          <Pressable
            style={styles.openButton}
            key={i}
            onPress={() => props.socket.emit('joinTwoPlayer', gameObj.gameCode)}
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
    socket: state.socketReducer
  }
}

export default connect(mapStateToProps)(JoinGame);

