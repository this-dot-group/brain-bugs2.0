import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { Redirect } from 'react-router-native'
import { connect } from 'react-redux';
import { numQuestions, newCategory, publicOrPrivate, getQuestions, resetQuestions } from '../../store/gameInfoReducer';
import { newOpponent } from '../../store/userReducer';
import { playSound } from '../../store/soundsReducer'


import { Buttons } from '../../styles'


const styles = StyleSheet.create({
  backToLobbyButton: {
    ...Buttons.openButton,
    marginTop: 20
  },
})

function GameEnd(props) {

  const [backToLobby, setBackToLobby] = useState(false);
  const [rematchReady, setRematchReady] = useState(false)
  const [roomJoin, setRoomJoin] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [userOutcome, setUserOutcome] = useState('')

  const playerOneName = props.location.state.finalScore.playerOne.name
  const playerOneScore = props.location.state.finalScore.playerOne.score
  const playerOneSocket = props.location.state.finalScore.playerOne.socket;
  const playerTwoName = props.location.state.finalScore.playerTwo.name
  const playerTwoScore = props.location.state.finalScore.playerTwo.score;
  const token = props.location.state.finalScore.token;

  useEffect(() => {
    // Play sound to reward winner and punish loser
    let userObj = playerOneSocket === props.socketId ? props.location.state.finalScore.playerOne : props.location.state.finalScore.playerTwo;

    setCurrentUserObj(userObj)

    if (playerTwoScore === playerOneScore) {
      setUserOutcome('tie');
    } else if (userObj.score === Math.max(playerOneScore, playerTwoScore)) {
      props.playSound('win');
      setUserOutcome('win');
    } else {
      props.playSound('lose');
      setUserOutcome('lose');
    }

    props.socket.on('rematchInvitation', onRematchInvitation);
    props.socket.on('opponentRematchResponse', onRematchResponse)
    props.socket.on('gameCodeForRematch', joinRematch)
    props.socket.on('redirectToHowToPlay', redirect);

    return () => {
      props.socket.off('rematchInvitation', onRematchInvitation)
      props.socket.off('opponentRematchResponse', onRematchResponse)
      props.socket.off('gameCodeForRematch', joinRematch)
      props.socket.off('redirectToHowToPlay', redirect);

    }


  }, [])

  // 1. one person clicks button to request rematch, emits the "rematch" event
  // 2. server is emitting to the room (person who did not req rematch) the "rematchInvitation" event
  // 3. this event triggers showing the rematch invitation text/pressable to the rematch opponent, if yes, handleYes emits "rematchresponse" event and true
  // 4. server listening for rematchResponse, emits "opponentRematchResponse" with payload of boolean response and rematchGameInfo ojb, to original requestor
  // 5. this triggers, from the requestors side, adding the category/questions/'private' to gameinfo reducer. also emits the sendRematchOpponentToPrivateGameJoin event to get opponent to join them in private room. also for requestor, sets rematchReady to true which redirects them to Waiting Room
  // 6. server listens for this, emits gameCodeForRematch to opponent, triggers joinRematch function which emits the joinTwoPlayer event
  // 7. on server side, makes game obj, joins each person to room, and redirectsHowToPlay


  const redirect = (usernames) => {

    // this stuff is happening to the opponent (person who said yes to rematch)
    props.newOpponent(usernames.gameMaker);
    setRoomJoin(true);
  }

  const onRematchInvitation = () => {
    setShowInvitation(true)
  }

  const createOpponentSaidNoAlert = (opponent) => {
    Alert.alert(
      "Find another challenger!",
      `Your opponent ${opponent} declined your rematch request.`,
      [
        {
          text: "Back to Lobby",
          onPress: () => setBackToLobby(true),
        },
      ],
      { cancelable: false }
    );
  }

  const onRematchResponse = (payload) => {

    const { response, rematchGameInfo } = payload;
    // all the stuff in this function is happening to the person who ASKED for the rematch

    if(response){

      props.newCategory({ name: rematchGameInfo.categoryName, id: rematchGameInfo.categoryID })
      props.numQuestions(rematchGameInfo.numQuestions);
      props.publicOrPrivate('private');

      props.socket.emit('sendRematchOpponentToPrivateGameJoin', props.gameCode);

      setRematchReady(true);
    
    }

    if(!response) {
      createOpponentSaidNoAlert(props.opponent);
    }
    
  }

  const joinRematch = (gameCode) => {

    // this stuff is happening to the person who said YES to the rematch, the opponent

    if (props.numPlayers === 1) {
      props.fakeOpponentSocket.emit('joinTwoPlayer', [gameCode, 'Cricket']);
    }
    props.socket.emit('joinTwoPlayer', [gameCode, props.username]);
  }


  const handleRematch = () => {
    props.socket.emit('rematch')
    if (props.numPlayers === 1) {
      props.resetQuestions()
      setRematchReady(true);
    }
  };

  const handleYes = () => {
    props.socket.emit('rematchResponse', true)
  }

  const handleNo = () => {
    props.socket.emit('rematchResponse', false)
    leaveRoomAndGoToLobby();

  }

  const leaveRoomAndGoToLobby = () => {

    props.socket.emit('leaveRoom');
    if (props.gameInfo.numPlayers === 1) {
      props.fakeOpponentSocket.emit('leaveRoom');
    }
    setBackToLobby(true);
  }


  return (
    <View>
      <Text> Game End </Text>
      <Text>{playerOneName} {playerOneScore}</Text>
      <Text>{playerTwoName} {playerTwoScore}</Text>
      <Pressable
        style={styles.backToLobbyButton}
        onPress={leaveRoomAndGoToLobby}
      >
        <Text>Back to Lobby</Text>
      </Pressable>

      <Pressable style={styles.backToLobbyButton} onPress={handleRematch}>
        <Text>Rematch</Text>
      </Pressable>

      {backToLobby && <Redirect to='/lobby' />}

      {rematchReady && <Redirect to={{
        pathname:'/waitingroom',
        state: { token },
      }}/>}
      {roomJoin && <Redirect to='/howtoplay'/>}

      {showInvitation &&
        <>
          <Text>{props.opponent} wants a rematch! What do you think?</Text>
          <Pressable
            style={styles.backToLobbyButton}
            onPress={handleYes}
          >
            <Text>Yes</Text>
          </Pressable>

          <Pressable
            style={styles.backToLobbyButton}
            onPress={handleNo}
          >
            <Text>No</Text>
          </Pressable>
        </>}

    </View>
  )
}

const mapStateToProps = state => ({
  gameInfo: state.gameInfoReducer,
  gameCode: state.userReducer.gameCode,
  socket: state.socketReducer,
  socketId: state.userReducer.socketId,
  fakeOpponentSocket: state.fakeOpponentSocketReducer,
  opponent: state.userReducer.opponent,
  username: state.userReducer.username,
  numPlayers: state.gameInfoReducer.numPlayers || 2,
})

const mapDispatchToProps = {
  numQuestions,
  newCategory,
  publicOrPrivate,
  getQuestions,
  resetQuestions,
  newOpponent,
  playSound
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEnd);

