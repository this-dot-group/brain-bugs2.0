import { Audio } from 'expo-av';

export default function soundsReducer(state = {}, action) {

  const { type, payload } = action;

  switch (type) {
  case 'NEW_SOUND':
    return { ...state, [payload.name]: payload.newSound };

  default:
    return state;

  }

}

export const isMuted = (state = false, { type }) => type === 'TOGGLE_MUTE' ? !state : state;

export const newSound = (sound, name) => {
  return async dispatch => {
    let newSound = new Audio.Sound();
    await newSound.loadAsync(sound);
    dispatch({
      type: 'NEW_SOUND',
      payload: { name, newSound },
    });
  }
};

export const playSound = soundName => {
  return async (_dispatch, getState) => {
    const { soundsReducer, isMuted } = getState();
    if (isMuted) return;
    try {
      if (soundsReducer[soundName]) {
        await soundsReducer[soundName].replayAsync();
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const toggleMute = () => {
  return async (dispatch, getState) => {
    const { soundsReducer, isMuted } = getState();
    try {
      for (let sound in soundsReducer) {
        soundsReducer[sound].setIsMutedAsync(!isMuted);
      }
      dispatch({type: 'TOGGLE_MUTE'})
    } catch(e) {
      console.error(e)
    }
  }
}