export default (state = '', action) => {

  const { type, payload } = action;
 
  switch (type) {

  case 'NEW_CONNECTION':
    return payload;

  default:
    return state;

  }

}

export const newSocket = (socket) => {

  return {
    type: 'NEW_CONNECTION',
    payload: socket,
  }
}