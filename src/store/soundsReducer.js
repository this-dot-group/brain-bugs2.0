import { Audio } from 'expo-av'

export default function soundsReducer(state = {}, action) {

  const { type, payload } = action;

  switch (type) {
  case 'NEW_SOUND':
    return { ...state, [payload.name]: payload.newSound };

  default:
    return state;

  }

}

export const newSound = (sound, name) => {
  return async dispatch => {
    let newSound = new Audio.Sound();
    await newSound.loadAsync(sound)
    dispatch({
      type: 'NEW_SOUND',
      payload: { name, newSound },
    });
  }
};

export const playSound =  soundName => {
  return async (_, getState) => {
    const { soundsReducer } = getState();
    try {
      // const obj = await soundsReducer[soundName].replayAsync();
      await soundsReducer[soundName].replayAsync();
    } catch (e) {
      console.log(e)
    }
  }
}