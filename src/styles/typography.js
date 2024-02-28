import { brightGreen, red, yellow, brightRed, darkBackground, darkBackgroundLightestShade } from "./colors";

const countdownTextBase = {
  textAlign: 'center',
  fontFamily: 'VT323',
  color: brightRed.hex
}
export const countdownText = {
  small: {
    ...countdownTextBase,
    fontSize: 24
  },
  medium: {
    ...countdownTextBase,
    fontSize: 26
  },
  large: {
    ...countdownTextBase,
    fontSize: 28
  }
};

export const countdownTextLg = {
  small: {
    ...countdownTextBase,
    fontSize: 50
  },
  medium: {
    ...countdownTextBase,
    fontSize: 52
  },
  large: {
    ...countdownTextBase,
    fontSize: 54
  }
};

////// HEADING ONE 
////// - logo text 
////// - welcome greeting 

const headingTextBase = {
  fontFamily: 'DotGothic',
  margin: 4,
  color: yellow.hex
}

export const headingOneText = {
  small: {
   ...headingTextBase,
      fontSize: 50,
  },
  medium: {
    ...headingTextBase,
    fontSize: 55  
  },
  large: {
    ...headingTextBase,
    fontSize: 60  
  }
}

////// HEADING TWO 
////// - logo text 
////// - welcome greeting 

export const headingTwoText = {
  small: {
   ...headingTextBase,
      fontSize: 28
  },
  medium: {
    ...headingTextBase,
    fontSize: 32  
  },
  large: {
    ...headingTextBase,
    fontSize: 42
  }
}

////// HEADING THREE 
////// - dropdown title text 

export const headingThreeText = {
  small: {
   ...headingTextBase,
      fontSize: 32
  },
  medium: {
    ...headingTextBase,
    fontSize: 38  
  },
  large: {
    ...headingTextBase,
    fontSize: 42 
  }
}

////// HEADING FOUR 
////// - dropdown title text 

export const headingFourText = {
  small: {
   ...headingTextBase,
      fontSize: 32
  },
  medium: {
    ...headingTextBase,
    fontSize: 36
  },
  large: {
    ...headingTextBase,
    fontSize: 36
  }
}

////// INNER TEXT 
////// - how to play btn 

const innerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center',
  color: yellow.hex
}

export const innerText = {
  small: {
    ...innerTextBase,
    fontSize: 18
  },
  medium: {
    ...innerTextBase,
    fontSize: 22
  },
  large: {
    ...innerTextBase,
    fontSize: 24
  }
}

////// GO BTN INNER TEXT 
////// - go btn 

const goBtnInnerTextBase = {
  fontFamily: 'VT323',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center',
  color: darkBackground.hex
}

export const goBtnInnerText = {
  small: {
    ...goBtnInnerTextBase,
    fontSize: 22
  },
  medium: {
    ...goBtnInnerTextBase,
    fontSize: 24
  },
  large: {
    ...goBtnInnerTextBase,
    fontSize: 26
  }
}

////// DROPDOWN INNER LABEL TEXT 
////// - start game

const dropdownInnerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center',
  color: yellow.hex
}

export const dropdownInnerText = {
  small: {
    ...dropdownInnerTextBase,
    fontSize: 18
  },
  medium: {
    ...dropdownInnerTextBase,
    fontSize: 20
  },
  large: {
    ...dropdownInnerTextBase,
    fontSize: 24
  }
}

////// SMALL INNER TEXT 
////// - available game pressables

const smInnerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center',
  color: yellow.hex
}

export const smallInnerText = {
  small: {
    ...smInnerTextBase,
    fontSize: 13
  },
  medium: {
    ...smInnerTextBase,
    fontSize: 14
  },
  large: {
    ...smInnerTextBase,
    fontSize: 15
  }
}

////// INPUT TEXT   
////// - input placeholder 

const inputTextBase = {
  height: '100%',
  flex: 1,
  fontFamily: 'DotGothic',
  paddingLeft: 8,
  flexDirection: 'row',
  color: yellow.hex
}

export const inputText = {
  small: {
    ...inputTextBase,
    fontSize: 18
  },
  medium: {
    ...inputTextBase,
    fontSize: 22
  },
  large: {
    ...inputTextBase,
    fontSize: 24
  }
}

////// CHAT INPUT TEXT 
////// - chat input

const chatInputTextBase = {
  fontFamily: 'DotGothic',
  flexGrow: 1,
  marginRight: 10,
  backgroundColor: darkBackgroundLightestShade.hex,
  color: darkBackground.hex,
  zIndex: 2,
  width: '80%'
}

export const chatInputText = {
  small: {
    ...chatInputTextBase,
    fontSize: 18,
    height: 40
  },
  medium: {
    ...chatInputTextBase,
    fontSize: 22,
    height: 46
  },
  large: {
    ...chatInputTextBase,
    fontSize: 24,
    height: 46
  }
}

////// NORMAL TEXT 
////// - how to play modal bullet pts 

const normalTextBase = {
  fontFamily: 'DotGothic',
  color: yellow.hex
}

export const normalText = {
  small: {
    ...normalTextBase,
    fontSize: 18,
    paddingVertical: 6,
  },
  medium: {
    ...normalTextBase,
    fontSize: 22,
    paddingVertical: 8,
  },
  large: {
    ...normalTextBase,
    fontSize: 24,
    paddingVertical: 10,
  }
}



////// ALERT TEXT 
////// - invalid code alert on private game screen 

const alertTextBase = {
  color: 'red',
  fontFamily: 'DotGothic',
  textAlign: 'center',
  color: brightRed.hex
}

export const alertText = {
  small: {
    ...alertTextBase,
    fontSize: 18
  },
  medium: {
    ...alertTextBase,
    fontSize: 22
  },
  large: {
    ...alertTextBase,
    fontSize: 24
  }
}

////// ANSWER OPTION TEXT 
////// - answer pressables during game play

const ansTextBase = {
  fontFamily: 'DotGothic',
  textAlign: 'center',
  position: 'absolute',
  width: '100%',
  color: yellow.hex
}

export const answerText = {
  small: {
    ...ansTextBase,
    fontSize: 16,
  },
  medium: {
    ...ansTextBase,
    fontSize: 18,
  },
  large: {
    ...ansTextBase,
    fontSize: 20,
  }
}

const ansTextDarkBase = {
  ...ansTextBase,
  color: darkBackground.hex,
}

export const answerTextDark = {
  small: {
    ...ansTextDarkBase,
    fontSize: 16,
  },
  medium: {
    ...ansTextDarkBase,
    fontSize: 18,
  },
  large: {
    ...ansTextDarkBase,
    fontSize: 20,
  }
}

////// SUBMIT TEXT 
////// - submit btn during gameplay

const submitTextBase = {
  fontFamily: 'VT323',
  textAlign: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
  color: yellow.hex
}

export const submitText = {
  small: {
    ...submitTextBase,
    fontSize: 20,
  },
  medium: {
    ...submitTextBase,
    fontSize: 22,
  },
  large: {
    ...submitTextBase,
    fontSize: 24,
  }
}

////// QUESTION TEXT 
////// - question during game play

const qTextBase = {
  fontFamily: 'VT323',
  textAlign: 'center',
  color: yellow.hex
}

export const questionText = {
  small: {
    ...qTextBase,
    fontSize: 28,
  },
  medium: {
    ...qTextBase,
    fontSize: 30,
  },
  large: {
    ...qTextBase,
    fontSize: 34,
  }
}

////// QUESTION COUNT TEXT 
////// - question counter during game play

const qCountTextBase = {
  fontFamily: 'VT323',
  textAlign: 'center',
  paddingTop: 2,
  color: yellow.hex
}

export const questionCountText = {
  small: {
    ...qCountTextBase,
    fontSize: 14,
  },
  medium: {
    ...qCountTextBase,
    fontSize: 16,
  },
  large: {
    ...qCountTextBase,
    fontSize: 18,
  }
}

////// USERNAME/SCORE TEXT 
////// - during gameplay

const scoreTextBase = {
  fontFamily: 'DotGothic',
  textAlign: 'center',
  color: yellow.hex
}

export const scoreText = {
  small: {
    ...scoreTextBase,
    fontSize: 13,
  },
  medium: {
    ...scoreTextBase,
    fontSize: 15,
  },
  large: {
    ...scoreTextBase,
    fontSize: 16,
  }
}

////// WAITING TEXT 
////// - during gameplay waiting for other player alert

const waitingTextBase = {
  fontStyle: 'italic',
  textAlign: 'center',
  color: yellow.hex
}

export const waitingText = {
  small: {
    ...waitingTextBase,
    fontSize: 13,
  },
  medium: {
    ...waitingTextBase,
    fontSize: 15,
  },
  large: {
    ...waitingTextBase,
    fontSize: 17,
  }
}


////// REMATCH TEXT 
////// - game end, rematch request

const rematchTextBase = {
  fontFamily: 'VT323',
  color: brightRed.hex
}

export const rematchText = {
  small: {
    ...rematchTextBase,
    fontSize: 24,
  },
  medium: {
    ...rematchTextBase,
    fontSize: 26,
  },
  large: {
    ...rematchTextBase,
    fontSize: 28,
  }
}
