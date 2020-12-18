export default (state = {}, action) => {

  const { type, payload } = action;
 
  switch (type) {

    case 'NEW_GAME':
      return payload;

    default:
      return state;

  }

}

export const newGame = (gameInfo) => {

  return {
    type: 'NEW_GAME',
    payload: gameInfo,
  }
}