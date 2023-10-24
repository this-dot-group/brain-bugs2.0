import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, PixelPressable, TitleBar } from '../../Shared';
import { Typography } from '../../../styles';
import { useSafeArea } from '../../../hooks';
import { CustomAlert } from '../../Shared/CustomAlert';

function JoinGame(props) {
  const { width } = useSafeArea();
  const [openAlert_JoinGame, setOpenAlert_JoinGame] = useState(false);

  const styles = StyleSheet.create({
    innerText: {
      ...Typography.innerText[props.screenDeviceWidth]
    },
    smallInnerText: {
      ...Typography.smallInnerText[props.screenDeviceWidth]
    },
    alertText: {
      ...Typography.headingTwoText[props.screenDeviceWidth],
      marginBottom: 4,
      textAlign: 'center'
    },
  });

  const handleOpenAlert = () => {
    setOpenAlert_JoinGame(true);
  }

  const handleCloseAlert = () => {
    // TODO: should we cancel the game here?
    setOpenAlert_JoinGame(false);
  }

  useEffect(() => {
    props.socket.on('couldNotJoinPlayers', handleOpenAlert)
    return () => {
      props.socket.off('couldNotJoinPlayers', handleCloseAlert)
    }
  }, [])

  const handleJoinTwoPlayer = gameObj => {
    props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username]);
  }

  return (
    <GenericModal
      visible={props.modalVisible === 'join'}
      disableBackground
    >
      <TitleBar
        cb={() => props.setModalVisible(null)}
        deviceSize={props.screenDeviceWidth}
      >
        Join a Game
      </TitleBar>

      <CustomAlert 
          visible={openAlert_JoinGame} 
          copy={
            <Text style={styles.alertText}>
              Sorry this game could not be joined. Please choose another game.
            </Text>
          }
          buttons={
            <>
              <PixelPressable
                buttonStyle={{height: 60}}
                pressableProps={{
                  onPress: handleCloseAlert
                }}
              >Ok</PixelPressable>
            </>
          }
        />
      <ScrollView>
        {props.gamesWaiting.map((gameObj, i) =>
          <PixelPressable
            key={i}
            buttonStyle={{
              width: width - 140,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            pressableProps={{ onPress: () => handleJoinTwoPlayer(gameObj) }}
          >
            <Text style={styles.smallInnerText}>
              {gameObj.player} is waiting to play {gameObj.category}
            </Text>
          </PixelPressable>
        )}

        {!props.gamesWaiting.length && 
          <Text style={styles.innerText}>No available games</Text>
        }
      </ScrollView>

    </GenericModal>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.username,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { newOpponent };

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

