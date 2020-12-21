export default (state = {}, action) => {

  const { type, payload } = action;

  switch (type) {

  case 'NEW_USER':
    return { ...state, username: payload };
  case 'NEW_GAME_CODE':
    console.log('making game code', payload);
    return { ...state, gameCode: payload };
  default:
    return state;
  }

}

export const newUsername = (username) => {

  return {
    type: 'NEW_USER',
    payload: username,
  }
}
export const newGameCode = (gameCode) => {

  return {
    type: 'NEW_GAME_CODE',
    payload: gameCode,
  }
}

