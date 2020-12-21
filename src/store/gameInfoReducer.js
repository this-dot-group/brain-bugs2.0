/* 
{
  category: {name, id}
  numPlayers:
  numQuestions:
}
*/

export default (state = {}, action) => {

  const { type, payload } = action;
  console.log(state);
 
  switch (type) {

    case 'NEW_GAME':
      return payload;
    case 'NEW_CATEGORY':
      console.log('category in reducer',payload);
      return {...state, category: payload };
    case 'NUM_PLAYERS':
      console.log('num players in reducer',payload);
      return {...state, numPlayers: payload };
    case 'NUM_QUESTIONS':
      console.log('num questions in reducer',payload);
      return {...state, numQuestions: payload};
    default:
      return state;

  }

}

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