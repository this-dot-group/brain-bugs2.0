import { useEffect } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';

function AppStateTracker(props) {


  const handleAppStateChange = (nextAppState) => {
    console.log('inAppSTATETracker:  ', nextAppState)


    let appStateGameCode = {
      appState: nextAppState,
      gameCode: props.gameCode,
      gamePhase: props.gamePhase
    }
    props.socket.emit('appStateUpdate', appStateGameCode)
  }


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // initial set to "active" state, listener will take care of changes
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

  // TODO: return a redirect if certain things are true? 
  // could maybe use gamePhase
  // if gamePhase is game play OR game end, and app state change is to background, send redirect
  return null;

}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(AppStateTracker);