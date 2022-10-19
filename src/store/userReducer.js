import axios from 'axios';
import { EXPO_LOCAL_URL } from '../../env'

export default (state = {}, action) => {

  const { type, payload } = action;

  switch (type) {

  case 'NEW_USER':
    return { ...state, username: payload };
  case 'PUSH_NOTIFICATION_TOKEN':
    return {...state, pushNotificationUserToken: payload}
  case 'NEW_GAME_CODE':
    return { ...state, gameCode: payload };
  case 'NEW_OPPONENT':
    return { ...state, opponent: payload };
  case 'NEW_SOCKET_ID':
    return { ...state, socketId: payload };
  case 'NEW_TOKEN':
    return { ...state, token: payload };
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

export const pushNotificationToken = answer => {
  return {
    type: 'PUSH_NOTIFICATION_TOKEN',
    payload: answer,
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

const _getToken = async endpoint => {
  try {
    const { data: token } = await axios.get(`http://${EXPO_LOCAL_URL}:3000/${endpoint}`);
    return token;
  } catch(e) {
    console.error(e);
  }
}

export const newToken = () => async dispatch => {
  dispatch({
    type: 'NEW_TOKEN',
    payload: await _getToken('token')
  });
}

export const resetUserGameToken = currentToken => async (_dispatch, getState) => {
  const token = currentToken || getState().userReducer.token;
  _getToken(`token-reset/${token}`);
}
