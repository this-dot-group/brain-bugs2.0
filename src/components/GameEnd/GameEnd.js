import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'
import { Redirect } from 'react-router-native'
import { connect } from 'react-redux';
import { numQuestions, newCategory, publicOrPrivate, getQuestions, resetQuestions } from '../../store/gameInfoReducer';
import { newOpponent } from '../../store/userReducer';
import { playSound } from '../../store/soundsReducer'
import Chat from '../Chat/Chat';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Score from './Score';
import { PixelButton } from '../Shared';
import MuteButton from '../MuteButton/MuteButton';
import { Buttons, Typography } from '../../styles';

function GameEnd({
  screenDeviceWidth,
  location,
  opponent,
  playSound,
  socket,
  socketId,
  newOpponent,
  resetQuestions,
  newCategory,
  numQuestions,
  publicOrPrivate,
  gameCode,
  numPlayers,
  fakeOpponentSocket,
  username,
  gameInfo,
}) {
  const [backToLobby, setBackToLobby] = useState(false);
  const [rematchReady, setRematchReady] = useState(false)
  const opponentSaidNoToRematch = useRef(false);
  const [roomJoin, setRoomJoin] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [/* userOutcome */, setUserOutcome] = useState('');
  const [opponentLeftRoom, setOpponentLeftRoom] = useState(false);
  const [saidYesToRematch, setSaidYesToRematch] = useState(false);
  const [rematchRequested, setRematchRequested] = useState(false);

  const playerOneName = location.state.finalScore.playerOne.name
  const playerOneScore = location.state.finalScore.playerOne.score
  const playerOneSocket = location.state.finalScore.playerOne.socket;
  const playerTwoName = location.state.finalScore.playerTwo.name
  const playerTwoScore = location.state.finalScore.playerTwo.score;
  const token = location.state.finalScore.token;

  const rematchText = `${opponent} wants a rematch! What do you think?`

  const styles = StyleSheet.create({
    root: {
      height: '100%',
      width: '100%',
      justifyContent: 'space-between'
    },
    showChatWrapper: {
      position: 'relative'
    },
    scoreRows: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center'
    },
    scoreRow : {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    innerText: {
      ...Typography.innerText[screenDeviceWidth]
    },
    rematchText: {
      ...Typography.rematchText[screenDeviceWidth]
    },
    optionBtns: {
      ...Buttons.howToPlayBtn[screenDeviceWidth]
    },
    rematchInvite: {
      display: 'flex',
      flexDirection: 'row',
      width: 200,
      alignItems: 'flex-start',
    },
    yesNoButtonCont: {
      display: 'flex',
      marginRight: 20
    },
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 50,
      paddingVertical: 30,
      justifyContent: 'space-between'
    },
    endButton : {
      marginLeft: 'auto'
    },
  })

  useEffect(() => {
    // Play sound to reward winner and punish loser
    let userObj = playerOneSocket === socketId ? location.state.finalScore.playerOne : location.state.finalScore.playerTwo;

    setCurrentUserObj(userObj)

    if (playerTwoScore === playerOneScore) {
      setUserOutcome('tie');
    } else if (userObj.score === Math.max(playerOneScore, playerTwoScore)) {
      playSound('win');
      setUserOutcome('win');
    } else {
      playSound('lose');
      setUserOutcome('lose');
    }

    socket.on('rematchInvitation', onRematchInvitation);
    socket.on('opponentRematchResponse', onRematchResponse)
    socket.on('gameCodeForRematch', joinRematch)
    socket.on('redirectToHowToPlay', redirect);
    socket.on('opponentLeftRoom', createOpponentLeftRoomAlert)

    return () => {
      socket.off('rematchInvitation', onRematchInvitation)
      socket.off('opponentRematchResponse', onRematchResponse)
      socket.off('gameCodeForRematch', joinRematch)
      socket.off('redirectToHowToPlay', redirect);
      socket.off('opponentLeftRoom', createOpponentLeftRoomAlert)

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
    newOpponent(usernames.gameMaker);
    setRoomJoin(true);
  }

  const onRematchInvitation = () => {
    setShowInvitation(true)
  }

  const createOpponentSaidNoAlert = (opponent) => {

    Alert.alert(
      'Find another challenger!',
      `Your opponent ${opponent} declined your rematch request.`,
      [
        {
          text: 'Back to Lobby',
          onPress: () => setBackToLobby(true),
        },
      ],
      { cancelable: false }
    );
  }

  const createOpponentLeftRoomAlert = () => {
    // check here to see if rematch is already no, in which case we dont need to show the alert
    if(!opponentSaidNoToRematch.current){
      Alert.alert(
        'Your opponent has left the room.',
        'Rematch and chat no longer enabled.',
        [
          {
            text: 'Got it',
            onPress: () => setOpponentLeftRoom(true),
          },
        ],
        { cancelable: false }
      );
      opponentSaidNoToRematch.current = false;
    }
    return;
  }

  const onRematchResponse = (payload) => {

    const { response, rematchGameInfo } = payload;
    // all the stuff in this function is happening to the person who ASKED for the rematch

    if (response) {
      resetQuestions();
      newCategory({ name: rematchGameInfo.categoryName, id: rematchGameInfo.categoryID })
      numQuestions(rematchGameInfo.numQuestions);
      publicOrPrivate('private');

      socket.emit('sendRematchOpponentToPrivateGameJoin', gameCode);

      setRematchReady(true);

    }

    if (!response) {
      // setting this to true so that when opponent leaves the room and triggers that event, the subsequent Alert will have a check to see if theyve already said no to a rematch, and then will not show that second Alert that theyve left the rom 
      opponentSaidNoToRematch.current = true;
      createOpponentSaidNoAlert(opponent);
    }

  }

  const joinRematch = (gameCode) => {

    // this stuff is happening to the person who said YES to the rematch, the opponent

    if (numPlayers === 1) {
      fakeOpponentSocket.emit('joinTwoPlayer', [gameCode, 'Cricket']);
    }
    socket.emit('joinTwoPlayer', [gameCode, username]);
  }


  const handleRematch = () => {
    setRematchRequested(true);
    socket.emit('rematch')
    if (numPlayers === 1) {
      resetQuestions()
      setRematchReady(true);
    }
  };

  const handleYes = () => {
    setRematchRequested(false);
    socket.emit('rematchResponse', true);
    setSaidYesToRematch(true);
  }

  const handleNo = () => {
    setRematchRequested(false);
    socket.emit('rematchResponse', false)
    leaveRoomAndGoToLobby();
  }

  const leaveRoomAndGoToLobby = () => {
    socket.emit('leaveRoom');
    if (gameInfo.numPlayers === 1) {
      fakeOpponentSocket.emit('leaveRoom');
    }
    setBackToLobby(true);
  }


  if (roomJoin) return <Redirect to='/howtoplay' />

  if (saidYesToRematch) return <LoadingScreen />

  return (
    <View style={styles.root}>
      <View style={styles.buttonRow}>
        {showInvitation ?
          <View style={styles.rematchInvite}>
            <View style={styles.yesNoButtonCont}>
              <PixelButton buttonStyle={{width: 60, marginBottom: 10 }}>
                <Pressable onPress={handleYes} style={{height: '100%', width: '100%'}}>
                  <Text style={styles.innerText}>Yes</Text>
                </Pressable>
              </PixelButton>

              <PixelButton buttonStyle={{width: 60}}>
                <Pressable onPress={handleNo} style={{height: '100%', width: '100%'}}>
                  <Text style={styles.innerText}>No</Text>
                </Pressable>
              </PixelButton>
            </View>
            <Text style={styles.rematchText}>{rematchText}</Text>
          </View> :
          !opponentLeftRoom && numPlayers === 2 &&
          <PixelButton buttonStyle={styles.optionBtns}>
            <Pressable 
              onPress={handleRematch} 
              style={{height: '100%', width: '100%'}}
              disabled={rematchRequested}
            >
              <Text style={styles.innerText}>{rematchRequested ? `Requesting...` : `Rematch`}</Text>
            </Pressable>
          </PixelButton>
        }
        <MuteButton styles={styles.endButton} />
      </View>
      <View style={styles.scoreRows} pointerEvents="none">
        <View style={styles.scoreRow}>
          <Score
            name={playerOneName}
            score={playerOneScore}
            isWinner={playerOneScore > playerTwoScore}
          />
          <Score
            name={playerTwoName}
            score={playerTwoScore}
            isWinner={playerTwoScore > playerOneScore}
          />
        </View>
        <View style={styles.scoreRow}>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <PixelButton buttonStyle={styles.optionBtns}>
          <Pressable
            onPress={leaveRoomAndGoToLobby}
            style={{height: '100%', width: '100%'}}
          >
            <Text style={styles.innerText}>Back to Lobby</Text>
          </Pressable>
        </PixelButton>

        {!opponentLeftRoom && numPlayers === 2 &&
          <Chat
            deviceWidth={screenDeviceWidth}
            gameCode={gameCode}
            user={currentUserObj}
            rematchPending={showInvitation}
            handleNo={handleNo}
            handleYes={handleYes}
            rematchText={rematchText}
          />
        }
      </View>

      {backToLobby && <Redirect to='/lobby' />}

      {rematchReady && <Redirect to={{
        pathname: '/waitingroom',
        state: { token },
      }} />}
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
  screenDeviceWidth: state.userReducer.deviceWidth
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

