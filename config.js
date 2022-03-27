const testMode = true;

// Should be 10
export const QUESTION_TIME = testMode ? 5 : 10;

// Should be 3
export const START_COUNTDOWN =  testMode ? 1 : 3;

// Should be [10, 15, 20, 25]
let numQuestions = [10, 15, 20, 25];
if (testMode) numQuestions = [1, 5, ...numQuestions];
export const QUESTION_DROPDOWN_CHOICES = numQuestions.map(value => ({
  label: value.toString(),
  value
}));

// Should be false
export const DEFAULT_MUTED = testMode;