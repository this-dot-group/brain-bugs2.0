import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, StyleSheet, Alert, Modal } from 'react-native'
import { Redirect } from 'react-router-native'
import { connect } from 'react-redux';
import { numQuestions, newCategory, publicOrPrivate, getQuestions, resetQuestions } from '../../store/gameInfoReducer';
import { newOpponent } from '../../store/userReducer';
import { playSound } from '../../store/soundsReducer'
import Chat from '../Chat/Chat';
import Badge from '../Chat/Badge';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { PixelButton, GenericModal } from '../Shared';
import MuteButton from '../MuteButton/MuteButton';
import { windowHeight } from '../../../config';


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
  score: {
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'relative',
    paddingBottom: 70
  },
  scoreText: {
    fontSize: 25,
  },
  trophy: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 0
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
  chatModalStyles : {
    height: windowHeight - 40,
  }
})

function GameEnd(props) {

  const [backToLobby, setBackToLobby] = useState(false);
  const [rematchReady, setRematchReady] = useState(false)
  const opponentSaidNoToRematch = useRef(false);
  const [roomJoin, setRoomJoin] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [/* userOutcome */, setUserOutcome] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [unseenMessages, setUnseenMessages] = useState(0);
  const [opponentLeftRoom, setOpponentLeftRoom] = useState(false);
  const [saidYesToRematch, setSaidYesToRematch] = useState(false);
  const [rematchRequested, setRematchRequested] = useState(false);

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
    props.socket.on('newMessage', calculateUnseenMessages);
    props.socket.on('opponentLeftRoom', createOpponentLeftRoomAlert)

    return () => {
      props.socket.off('rematchInvitation', onRematchInvitation)
      props.socket.off('opponentRematchResponse', onRematchResponse)
      props.socket.off('gameCodeForRematch', joinRematch)
      props.socket.off('redirectToHowToPlay', redirect);
      props.socket.off('newMessage', calculateUnseenMessages);
      props.socket.off('opponentLeftRoom', createOpponentLeftRoomAlert)

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

  const calculateUnseenMessages = messages => {
    if (showChat) { 
      setUnseenMessages(0);
      return;
    }
    if(!showChat) {
      const newMessages = messages.filter(message => {
        return !(props.socket.id.toString() in message.socketsSeen);
      });
      setUnseenMessages(newMessages.length);
    }

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
      props.resetQuestions();
      props.newCategory({ name: rematchGameInfo.categoryName, id: rematchGameInfo.categoryID })
      props.numQuestions(rematchGameInfo.numQuestions);
      props.publicOrPrivate('private');

      props.socket.emit('sendRematchOpponentToPrivateGameJoin', props.gameCode);

      setRematchReady(true);

    }

    if (!response) {
      // setting this to true so that when opponent leaves the room and triggers that event, the subsequent Alert will have a check to see if theyve already said no to a rematch, and then will not show that second Alert that theyve left the rom 
      opponentSaidNoToRematch.current = true;
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
    setRematchRequested(true);
    props.socket.emit('rematch')
    if (props.numPlayers === 1) {
      props.resetQuestions()
      setRematchReady(true);
    }
  };

  const handleYes = () => {
    setRematchRequested(false);
    props.socket.emit('rematchResponse', true);
    setSaidYesToRematch(true);
  }

  const handleNo = () => {
    setRematchRequested(false);
    props.socket.emit('rematchResponse', false)
    leaveRoomAndGoToLobby();
  }

  const handleShowChat = () => {
    setShowChat(true)
  };

  const leaveRoomAndGoToLobby = () => {

    props.socket.emit('leaveRoom');
    if (props.gameInfo.numPlayers === 1) {
      props.fakeOpponentSocket.emit('leaveRoom');
    }
    setBackToLobby(true);
  }

  const screenToShow = () => {
    if(roomJoin) return <Redirect to='/howtoplay' />
    if(saidYesToRematch) {
      return (
        <LoadingScreen />
      )
    }
    return false;
  }

  return screenToShow() || (
    <View style={styles.root}>
      <View style={styles.buttonRow}>
        {showInvitation ?
          <View style={styles.rematchInvite}>
            <View style={styles.yesNoButtonCont}>
              <PixelButton
                onPress={handleYes}
                buttonStyle={{width: 60, marginBottom: 10 }}
              >
                Yes
              </PixelButton>

              <PixelButton
                onPress={handleNo}
                buttonStyle={{width: 60 }}
              >
                No
              </PixelButton>
            </View>
            <Text>{props.opponent} wants a rematch! What do you think?</Text>
          </View> :
          !opponentLeftRoom && props.numPlayers === 2 &&
          <PixelButton 
            onPress={handleRematch}>
            {rematchRequested ? `Requesting...` : `Rematch`}
          </PixelButton>
        }
        <MuteButton styles={styles.endButton} />
      </View>
      <View style={styles.scoreRows} pointerEvents="none">
        <View style={styles.scoreRow}>
          <View style={styles.score}>
            <Text style={styles.scoreText}>{playerOneName}</Text>
            <Text style={styles.scoreText}>{playerOneScore}</Text>
            {playerOneScore > playerTwoScore && 
              <Image
                source={require('../../../assets/trophy.png')}
                style={{ height: 30, width: 30 }}
              />
            }
          </View>
          <View style={styles.score}>
            <Text style={styles.scoreText}>{playerTwoName}</Text>
            <Text style={styles.scoreText}>{playerTwoScore}</Text>
            {playerTwoScore > playerOneScore && 
              <Image
                source={require('../../../assets/trophy.png')}
                style={styles.trophy}
              />
            }
          </View>
        </View>
        <View style={styles.scoreRow}>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <PixelButton
          onPress={leaveRoomAndGoToLobby}
        >
          Back to Lobby
        </PixelButton>

        {!opponentLeftRoom && props.numPlayers === 2 &&
        <View style={styles.showChatWrapper}>
          <PixelButton onPress={handleShowChat} style={{position: 'relative'}}>
            Show Chat
          </PixelButton>
          {!!unseenMessages && <Badge>{unseenMessages}</Badge>}
        </View>
        }
      </View>
      <GenericModal
        visible={showChat}
        presentationStyle="fullScreen"
        style={styles.chatModalStyles}

      >
        <Chat
          setShowChat={setShowChat}
          gameCode={props.gameCode}
          user={currentUserObj}
          setUnseenMessages={setUnseenMessages}
        />
      </GenericModal>


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

