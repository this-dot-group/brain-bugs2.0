export default (state = '', action) => {

  const { type, payload } = action;
 
  switch (type) {

  case 'NEW_FAKE_OPPONENT':
    return payload;

  default:
    return state;

  }

};

export const newFakeOpponent = (socket) => {

  return {
    type: 'NEW_FAKE_OPPONENT',
    payload: socket,
  };
};