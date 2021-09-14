import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';



function AppStateTracker() {

  const handleAppStateChange = (nextAppState) => {
    console.log('APP STATE CHANGE:::::  ', nextAppState)

  }


  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };

  }, [])

  return null;

}

const mapStateToProps = (state) => {
  return {
    appState: state.userReducer.appState,
  }
}


export default connect(mapStateToProps)(AppStateTracker);