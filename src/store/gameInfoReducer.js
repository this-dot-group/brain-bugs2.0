import axios from 'axios';
import { EXPO_LOCAL_URL } from '../../env'
import he from 'he';

export default (state = {}, action) => {

  const { type, payload } = action;
 
  switch (type) {

  case 'NEW_GAME':
    return payload;
  case 'NEW_CATEGORY':
    return {...state, category: payload };
  case 'NUM_PLAYERS':
    return {...state, numPlayers: payload };
  case 'NUM_QUESTIONS':
    return {...state, numQuestions: payload};
  case 'PUBLIC_OR_PRIVATE':
    return {...state, publicOrPrivate: payload};
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

export const getQuestions = (id, numQuestions, tokenForRematch, categoryExpired, deviceWidth) => {

  return async (dispatch, getState) => {
    try {
      const { userReducer: { token } } = getState();

      let origResponse;

      let formattedData = []

      async function fetchAndFormatQuestionObjects(number) {

        const questionCharLimit = {
          small: 85,
          medium: 100,
          large: 145,
        };

        const answerCharLimit = {
          small: 50,
          medium: 45,
          large: 38,
        };

        const response = await axios.get(`http://${EXPO_LOCAL_URL}:3000/questions/${id}/${number}/${tokenForRematch || token}`)

        if(!response.data || !response.data.length) {
          categoryExpired();
          return;
        }

        origResponse = response

        // filter out objects with questions and correct answers that have too many characters
        const withoutLongQuestions = response.data.filter(obj => he.decode(obj.question).length <= questionCharLimit[deviceWidth])

        let withoutLongQsAndAs = withoutLongQuestions.filter(obj => he.decode(obj.correct_answer).length <= answerCharLimit[deviceWidth])

        // filter out objects with incorrect answers that have too many characters
        for (var i = withoutLongQsAndAs.length - 1; i >= 0; --i) {
          withoutLongQsAndAs[i].incorrect_answers.forEach(ans => {
              if(he.decode(ans).length > 42){withoutLongQsAndAs.splice(i, 1)}
            })
          }

        withoutLongQsAndAs.forEach(obj => formattedData.push(obj))

        if(withoutLongQsAndAs.length < number) {
          const newNumToFetch = number - withoutLongQsAndAs.length;
          await new Promise(resolve => setTimeout(resolve, 5000));
          await fetchAndFormatQuestionObjects(newNumToFetch);
        }   
      }


      await fetchAndFormatQuestionObjects(numQuestions + 5) // fetch 5 extra questions here to hopefully avoid having to refetch once the questions with too many characters are removed

      dispatch({
        type: 'GET_QUESTIONS',
        payload: formattedData,
      });

      // need to return the original response here so the catch block has access to clean e.response.data, since we're accessing and manipulating it above
      return origResponse

    } catch(e) {
      if(e.response.data === 'Invalid status code: 4') {
        console.error(e.response.data);
        categoryExpired();
      }
    }
  };
};

export const resetQuestions = () => ({
  type: 'GET_QUESTIONS',
  payload: null
})
