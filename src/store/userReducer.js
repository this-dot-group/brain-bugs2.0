import axios from 'axios';
import { EXPO_LOCAL_URL } from '../../env'

export default (state = {}, action) => {

  const { type, payload } = action;

  switch (type) {

  case 'NEW_USER':
    return { ...state, username: payload };
  case 'NEW_GAME_CODE':
    console.log('making game code', payload);
    return { ...state, gameCode: payload };
  case 'NEW_OPPONENT':
    return { ...state, opponent: payload };
  case 'NEW_SOCKET_ID':
    return { ...state, socketId: payload };
  case 'NEW_TOKEN':
    return { ...state, token: payload };
  case 'APP_STATE_GAME_CODE_OBJ':
    return {...state, appStateGameCode: payload};
  default:
    return state;
  }
};

export const newUsername = (username) => {

  return {
    type: 'NEW_USER',
    payload: username,
  };
};
export const newGameCode = (gameCode) => {

  return {
    type: 'NEW_GAME_CODE',
    payload: gameCode,
  };
};

export const newOpponent = (name) => {
  return {
    type: 'NEW_OPPONENT',
    payload: name,
  };
};

export const newSocketId = (id) => {
  return {
    type: 'NEW_SOCKET_ID',
    payload: id,
  };
};

export const appStateObj = (appStateandGameCodeObj) => {
  console.log('appStateandGameCodeObj in reducer: ', appStateandGameCodeObj)
  return {
    type: 'APP_STATE_GAME_CODE_OBJ',
    payload: appStateandGameCodeObj
  }
}

export const newToken = () => {
  return async dispatch => {
    try {
      const { data: token } = await axios.get(`http://${EXPO_LOCAL_URL}:3000/token`);
      dispatch({
        type:'NEW_TOKEN',
        payload: token,
      })
    } catch(e) {
      console.log(e);
    }
  }
}

