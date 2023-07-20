const initialState = {
  highScore: {
    id: 1,
    label: 'High Score',
    value: 0,
  },
  totalPoints: {
    id: 2,
    label: 'Total Points',
    value: 0,
  },
  outcomes: {
    id: 3,
    label: 'Record',
    win: 0,
    lose: 0,
    tie: 0,
    value: '0-0-0',
  },
  currentStreak: {
    id: 4,
    label: 'Current Streak',
    type: 'win',
    length: 0,
    value: 'Won last 0 games',
  },
  longestWinStreak: {
    id: 5,
    label: 'Longest Win Streak',
    value: 0,
  },
  winningPercentage: {
    id: 6,
    label: 'Win Percentage',
    value: `${0}%`,
  },
};

const winningPct = outcomes => {
  if (!(outcomes.win || outcomes.lose || outcomes.tie)) return 0;
  return Math.floor(outcomes.win / (outcomes.win + outcomes.lose + outcomes.tie) * 100);
}

const streakString = currentStreak => {
  const typeMap = {
    win: 'Won',
    lose: 'Lost',
    tie: 'Tied',
  };

  return typeMap[currentStreak.type]
    + ' last'
    + (currentStreak.length === 1 ? '' : ` ${currentStreak.length}`)
    + ' game'
    + (currentStreak.length === 1 ? '' : 's');
}

const handleStreak = ({ currentStreak }, outcome) => {
  let updatedStreakNumbers;
  if (currentStreak.type === outcome) {
    updatedStreakNumbers = {
      type: outcome,
      length: currentStreak.length + 1,
    }
  } else {
    updatedStreakNumbers =  {
      type: outcome,
      length: 1,
    }
  }
  return {
    ...currentStreak,
    ...updatedStreakNumbers,
    value: streakString(updatedStreakNumbers),
  };
}

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === 'UPDATE_STATS') {
    const { outcome, score } = payload;
    const newState = { ...state };
  
    const newOutcomes = {
      ...newState.outcomes,
      [outcome]: newState.outcomes[outcome] + 1,
    };

    newState.outcomes = {
      ...newOutcomes,
      value: `${newOutcomes.win}-${newOutcomes.lose}-${newOutcomes.tie}`,
    };

    newState.winningPercentage = {
      ...newState.winningPercentage,
      value: `${winningPct(newState.outcomes)}%`,
    };
  
    newState.totalPoints = {
      ...newState.totalPoints,
      value: newState.totalPoints.value += score,
    };

    newState.highScore = {
      ...newState.highScore,
      value: Math.max(newState.highScore.value, score),
    };

    newState.currentStreak = handleStreak(newState, outcome);

    if (outcome === 'win') {
      newState.longestWinStreak =  {
        ...newState.longestWinStreak,
        value: Math.max(newState.longestWinStreak.value, newState.currentStreak.length)
      }
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