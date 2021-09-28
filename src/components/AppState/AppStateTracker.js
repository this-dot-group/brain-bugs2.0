import React, { useEffect, useState, useRef } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { appStateObj } from '../../store/userReducer'


function AppStateTracker(props) {


  const handleAppStateChange = (nextAppState) => {
    console.log('APP STATE CHANGE:::::  ', nextAppState)

    console.log('props.gameCode:', props.gameCode)

    let appStateGameCode = {
      appState: nextAppState,
      gameCode: props.gameCode,
    }

    props.appStateObj(appStateGameCode)

    props.socket.emit('appStateUpdate', appStateGameCode)
    
    // emit event to server with appState and gameCode, add to availableGames

    //then when gameJoiner comes in youd check appState and send notification accordingly


  }


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // initial set to "active" state, listener will take care of changes
    let appStateGameCode = {
      appState: AppState.currentState,
      gameCode: props.gameCode,
    }
    props.appStateObj(appStateGameCode)

    props.socket.emit('appStateUpdate', appStateGameCode)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };

  }, [])


  return null;

}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

const mapDispatchToProps = { appStateObj };

export default connect(mapStateToProps, mapDispatchToProps)(AppStateTracker);