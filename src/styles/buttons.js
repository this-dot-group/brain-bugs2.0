import { blue, brightGreen, darkBlue, red } from './colors';

////// HOW TO PLAY BTN WIDTH //////////////
////// - how to play btn ///////

export const howToPlayBtn = {
  small: {
    width: 120,
    height: 40
  },
  medium: {
    width: 160,
    height: 46
  },
  large: {
    width: 170,
    height: 46
  }
}

////// LIST OPTION BTN WIDTH /////
////// - lobby screen options /////

export const listOptionBtns = {
  small: {
    width: 240,
    height: 54,
    marginBottom: 18
  },
  medium: {
    width: 300,
    height: 54,
    marginBottom: 20,
  },
  large: {
    width: 340,
    height: 54,
    marginBottom: 30
  }
}

////// LIST OPTION BTN WIDTH /////
////// - start game options ///////

export const createGameListOptionBtns = {
  small: {
    width: 400,
    height: 54,
  },
  medium: {
    width: 500,
    height: 54,
  },
  large: {
    width: 500,
    height: 54,
  }
}

/// START GAME OPTION BTN VIEW //
//// - wraps option dropdowns ///

export const dropdownBtns = {
  small: {
    height: 50,
  },
  medium: {
    height: 50,
  },
  large: {
    height: 50,
  }
}

////// NO MORE CATEGORIES OPTION BTNS WIDTH /////
////// - waiting room screen options /////

export const noMoreCategoriesBtns = {
  small: {
    width: 220,
    height: 70,
    marginTop: 20
  },
  medium: {
    width: 240,
    height: 80,
    marginTop: 24,
  },
  large: {
    width: 280,
    height: 90,
    marginTop: 20
  }
}

////// STATS BTN WIDTH //////////////
////// - stats btn ///////

export const statsBtn = {
  small: {
    width: 80,
    height: 40
  },
  medium: {
    width: 90,
    height: 46
  },
  large: {
    width: 100,
    height: 46
  }
}

////// SETTINGS DRAWER //////////////
//////  settings drawer- ///////

export const settingsDrawer = {
  small: {
    width: 140,
    height: 45
  },
  medium: {
    width: 180,
    height: 50
  },
  large: {
    width: 190,
    height: 50
  }
}

////// Game Play //////////////
//////  answer button styles- ///////

const ansBtnBase = {
  height: 70,
  borderColor: blue.hex,
  padding: 4,
}

export const answerBtn = {
  small: {
    ...ansBtnBase,
    width: 200,
  },
  medium: {
    ...ansBtnBase,
    width: 240,
  },
  large: {
    ...ansBtnBase,
    width: 260,
  }
}

export const answerButtonSelected = (screenWidth) => {
  return {
    ...answerBtn[screenWidth],
    backgroundColor: blue.hex,
  }
};

export const answerButtonSubmitted = (screenWidth) => {
  return {
    ...answerBtn[screenWidth],
    backgroundColor: darkBlue.hex,
    borderColor: darkBlue.hex,
  }
};

export const answerButtonCorrect = (screenWidth) => {
  return {
    ...answerBtn[screenWidth],
    backgroundColor: brightGreen.hex,
    borderColor: brightGreen.hex,
  }  
};

export const answerButtonIncorrect = (screenWidth) => {
  return {
    ...answerBtn[screenWidth],
    backgroundColor: red.hex,
    borderColor: red.hex,
  }
};

export const nonSelectedAnswer = {
  justifyContent: 'center',
  height: '100%',
  width: '100%',
};

export const answerThemeButtonCont = {
  position: 'absolute',
  left: 0,
  top: 0,
};
