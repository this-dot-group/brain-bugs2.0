import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';

function AppStateTracker(props) {


  const handleAppStateChange = (nextAppState) => {
    console.log('APP STATE CHANGE:::::  ', nextAppState)

    console.log('props.gameCode:', props.gameCode)

    let appStateGameCode = {
      appState: nextAppState,
      gameCode: props.gameCode,
    }

    props.socket.emit('appStateUpdate', appStateGameCode)
  }


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // initial set to "active" state, listener will take care of changes
    let appStateGameCode = {
      appState: AppState.currentState,
      gameCode: props.gameCode,
    }

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

export default connect(mapStateToProps)(AppStateTracker);