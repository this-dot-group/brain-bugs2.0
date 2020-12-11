export default (state = '', action) => {

  const { type, payload } = action;
//  console.log('payload', payload);
//  console.log('action', action)
//  console.log('type', type)
  switch (type) {

    case 'NEW_USER':
      return payload;
   
    default:
      return state;

  }

}

export const newUsername = (username) => {

  console.log('in usernameReducer!! username: ', username)

  return {
    type: 'NEW_USER',
    payload: username,
  }
}

