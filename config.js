const testMode = true;

import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

// Should be 10
export const QUESTION_TIME = 10;

// Should be 3
export const START_COUNTDOWN = testMode ? 1 : 3;

// Should be [5, 10, 15]
let numQuestions = [5, 10, 15];
if (testMode) numQuestions = [1, ...numQuestions];
export const QUESTION_DROPDOWN_CHOICES = numQuestions.map(value => ({
  label: value.toString(),
  value
}));

export const instructions = [
  'Read the question',
  'Select an answer',
  'Press submit before the timer runs out',
  'Answer quickly to get more points',
  'Chat with your opponent after the game'
].map((instruction, i) => ({instruction, id: i + instruction[0]}))