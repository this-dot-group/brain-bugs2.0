import axios from 'axios';
import { EXPO_LOCAL_URL } from '../../env'
import he from 'he';

export default (state = {}, action) => {

  const { type, payload } = action;
 
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
  case 'PUSH_TOKEN_ALERT_INTERACTION':
    return {...state, pushTokenAlertInteraction: payload}
  case 'GAME_MAKER_PUSH_TOKEN':
    // console.log('gameMakerPushToken in reducer',payload);
    return {...state, gameMakerPushToken: payload};
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

// not explicit to game information, but needed for reducer to show 'Go' button
export const pushTokenAlertInteraction = answer => {
  return {
    type: 'PUSH_TOKEN_ALERT_INTERACTION',
    payload: answer,
  };
};

export const gameMakerPushToken = pushToken => {
  return {
    type: 'GAME_MAKER_PUSH_TOKEN',
    payload: pushToken
  }
}

export const getQuestions = (id, numQuestions, tokenForRematch, categoryExpired) => {

  return async (dispatch, getState) => {
    try {
      const { userReducer: { token } } = getState();

      let origResponse;

      async function fetchAndFormatQuestionObjects() {

        const response = await axios.get(`http://${EXPO_LOCAL_URL}:3000/questions/${id}/${numQuestions + 10}/${tokenForRematch || token}`)

        if(!response.data || !response.data.length) {
          categoryExpired();
          return;
        }

        origResponse = response

        // filter out objects with questions and correct answers that have too many characters
        const withoutLongQuestions = response.data.filter(obj => he.decode(obj.question).length <= 80)
        const formattedData = withoutLongQuestions.filter(obj => he.decode(obj.correct_answer).length <= 38)

        // filter out objects with incorrect answers that have too many characters
        for (var i = formattedData.length - 1; i >= 0; --i) {
          formattedData[i].incorrect_answers.forEach(ans => {
              if(he.decode(ans).length > 42){formattedData.splice(i, 1)}
            })
          }

        if(formattedData.length < numQuestions) {
          fetchAndFormatQuestionObjects()
        }

        let correctNumQuestions;
        
        if(formattedData.length > numQuestions){
          const howManyToSlice = formattedData.length - numQuestions
          return correctNumQuestions = formattedData.slice(howManyToSlice)
        } else {
          return formattedData
        } 
      }

      const data = await fetchAndFormatQuestionObjects();

      dispatch({
        type: 'GET_QUESTIONS',
        payload: data,
      });

      // need to return the original response here so the catch block has access to clean
      //  e.response.data, since we're accessing and manipulating it above
      return origResponse

    } catch(e) {
      if(e.response.data === 'Invalid status code: 4') {
        console.log(e.response.data);
        categoryExpired();
      }
    }
  };
};

export const resetQuestions = () => ({
  type: 'GET_QUESTIONS',
  payload: null
})
