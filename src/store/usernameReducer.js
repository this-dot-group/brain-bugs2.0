export default ( state='', action ) => {

  const { type, payload } = action;

  switch(type) {

    case 'NEW_USER':
      return payload;

    default:
      return state;

  }

}

export const newUsername = ( username ) => {

  return {
    type: 'NEW_USER',
    payload: username,
  }
}

