import React, { useEffect, useState, useRef } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native'

function AppStateTracker(props) {
  const [backToHome, setBackToHome] = useState(false);
  const appState = useRef(AppState.currentState);
  const {gameCode, gamePhase, socket} = props;

  const handleAppStateChange = (nextAppState) => {
    // if a user backgrounded during gameplay and then they return, redirect home
    const fromBackgroundToActive = (appState.current === 'background' || appState.current === 'inactive') && nextAppState === 'active';

    appState.current = nextAppState;

    if(fromBackgroundToActive && (gamePhase === 'game_play' || gamePhase === 'game_end')) {
      setBackToHome(true)
    }

    let appStateGameCode = {
      appState: nextAppState,
      gameCode: gameCode,
      gamePhase: gamePhase,
    }.
    
    socket.emit('appStateUpdate', appStateGameCode)
  }


  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // initial set to "active" state, listener will take care of changes
    let appStateGameCode = {
      appState: AppState.currentState,
      gameCode: gameCode,
      gamePhase: gamePhase,
    }

    socket.emit('appStateUpdate', appStateGameCode)

    return () => {
      subscription.remove();
    };

  }, [])

  return (
    backToHome
      ? <Redirect to='/' />
      : null
  )

}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(AppStateTracker);