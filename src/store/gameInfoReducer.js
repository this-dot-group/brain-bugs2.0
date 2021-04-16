/* 
{
  category: { name, id }
  numPlayers:
  numQuestions:
  publicOrPrivate: 
}
*/

import axios from 'axios';

// const EXPO_LOCAL_URL = '10.0.0.200'; // Josh
const EXPO_LOCAL_URL = '192.168.0.4'; // Tia
// const EXPO_LOCAL_URL = '10.0.0.199'; // Chris 

export default (state = {}, action) => {

  const { type, payload } = action;
  // console.log(state);
 
  switch (type) {

  case 'NEW_GAME':
    return payload;
  case 'NEW_CATEGORY':
    // console.log('category in reducer',payload);
    return {...state, category: payload };
  case 'NUM_PLAYERS':
    // console.log('num players in reducer',payload);
    return {...state, numPlayers: payload };
  case 'NUM_QUESTIONS':
    // console.log('num questions in reducer',payload);
    return {...state, numQuestions: payload};
  case 'PUBLIC_OR_PRIVATE':
    // console.log('public OR private in reducer',payload);
    return {...state, publicOrPrivate: payload};
  case 'GET_QUESTIONS':
    return {...state, liveGameQuestions: payload};
  default:
    return state;
  }
};

export const newGame = (gameInfo) => {

  return {
    type: 'NEW_GAME',
    payload: gameInfo,
  };
};
export const newCategory = category => {
  return {
    type: 'NEW_CATEGORY',
    payload: category,
  };
};
export const numPlayers = num => {
  return {
    type: 'NUM_PLAYERS',
    payload: num,
  };
};
export const numQuestions = num => {
  return {
    type: 'NUM_QUESTIONS',
    payload: num,
  };
};

export const publicOrPrivate = answer => {
  return {
    type: 'PUBLIC_OR_PRIVATE',
    payload: answer,
  };
};

export const getQuestions = (id, numQuestions) => {
  
  return async dispatch => {
    const response = await axios.get(`http://${EXPO_LOCAL_URL}:3000/questions/${id}/${numQuestions}`);
    console.log('response from axois', response.data);
    dispatch({
      type: 'GET_QUESTIONS',
      payload: response.data,
    });
  };
};
