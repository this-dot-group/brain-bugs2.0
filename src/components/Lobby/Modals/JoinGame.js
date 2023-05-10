import React, {useEffect} from 'react'
import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
import { newOpponent } from '../../../store/userReducer';
import { connect } from 'react-redux';
import { GenericModal, PixelPressable, TitleBar } from '../../Shared';
import { Typography } from '../../../styles';

function JoinGame(props) {

  const { width } = Dimensions.get('window');  

  const styles = StyleSheet.create({
    innerText: {
      ...Typography.innerText[props.screenDeviceWidth]
    },
    smallInnerText: {
      ...Typography.smallInnerText[props.screenDeviceWidth]
    }
  });

  useEffect(() => {
    props.socket.on('couldNotJoinPlayers', alertGameJoinerCantJoin)
    return () => {
      props.socket.off('couldNotJoinPlayers', alertGameJoinerCantJoin)
    }
  }, [])

  const alertGameJoinerCantJoin = () => {
    props.socket.emit('refreshAvailableGameList')
    Alert.alert(
      'We are sorry, this game could not be joined.',
      'The game creator is unavailable. Please choose another game!',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: true }
    );
  };

  const handleJoinTwoPlayer = gameObj => {
    props.socket.emit('joinTwoPlayer', [gameObj.gameCode, props.username]);
  }

  return (
    <GenericModal
      visible={props.modalVisible === 'join'}
    >
      <TitleBar
        cb={() => props.setModalVisible(null)}
        deviceSize={props.screenDeviceWidth}
      >
        Join a Game
      </TitleBar>
  
      {props.gamesWaiting.map((gameObj, i) =>
        <PixelPressable
          key={i}
          buttonStyle={{ width: width-140, marginLeft: 'auto', marginRight: 'auto' }}
          pressableProps={{ onPress: () => handleJoinTwoPlayer(gameObj) }}
        >
          <Text style={styles.smallInnerText}>
            {gameObj.player} is waiting to play {gameObj.category}
          </Text>
        </PixelPressable>
      )}

      {!props.gamesWaiting.length && 
        <Text style={styles.innerText}>No available games yet...</Text>
      }

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

