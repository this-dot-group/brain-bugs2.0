import { useEffect } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';

function AppStateTracker(props) {


  const handleAppStateChange = (nextAppState) => {
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

  return null;

}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(AppStateTracker);