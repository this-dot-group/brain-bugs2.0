const initialState = {
  highScore: 0,
  totalPoints: 0,
  outcomes: {
    win: 0,
    lose: 0,
    tie: 0,
  },
  currentStreak: {
    type: 'win',
    length: 0,
  },
  longestWinStreak: 0,
};

const handleStreak = ({ currentStreak }, outcome) => {
  console.log(outcome, currentStreak)
  if (currentStreak.type === outcome) {
    return {
      type: outcome,
      length: currentStreak.length + 1
    };
  }

  return {
    type: outcome,
    length: 1,
  };
}

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'UPDATE_STATS') {
    const { outcome, score } = payload;
    const newState = { ...state };
  
    newState.outcomes = {
      ...newState.outcomes,
      [outcome]: newState.outcomes[outcome] + 1,
    }
  
    newState.totalPoints += score;
    newState.highScore = Math.max(newState.highScore, score);
    newState.currentStreak = handleStreak(newState, outcome);

    if (outcome === 'win') {
      newState.longestWinStreak = Math.max(newState.longestWinStreak, newState.currentStreak.length);
    }

    return newState;
  }

  return state;
}

export function updateGame (
  outcome,
  score
) {
  return {
    type: 'UPDATE_STATS',
    payload: { outcome, score },
  };
}