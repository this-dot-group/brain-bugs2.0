import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native'

function AppStateTracker(props) {

  const [backToHome, setBackToHome] = useState(false);

  let socketIdOfUserWhoBackgrounded;

  const handleAppStateChange = (nextAppState) => {
    console.log('app state on change',nextAppState)
    // if a user was previously backgrounded and then they return, redirect home
    if(nextAppState === "active" && props.socket.id === socketIdOfUserWhoBackgrounded) {
      setBackToHome(true)
    }
    
    let appStateGameCode = {
      appState: nextAppState,
      gameCode: props.gameCode,
      gamePhase: props.gamePhase
    }
    
    props.socket.emit('appStateUpdate', appStateGameCode)

    if((nextAppState === "background" || nextAppState === "inactive") && props.gamePhase === "game_play") {
      socketIdOfUserWhoBackgrounded = props.socket.id
    }

  }


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // initial set to "active" state, listener will take care of changes
    console.log('inAppStateTracker useEffect:', AppState.currentState)
    let appStateGameCode = {
      appState: AppState.currentState,
      gameCode: props.gameCode,
      gamePhase: props.gamePhase,
    }

    props.socket.emit('appStateUpdate', appStateGameCode)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
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