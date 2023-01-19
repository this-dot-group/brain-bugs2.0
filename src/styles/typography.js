const countdownTextBase = {
  color: 'red',
  textAlign: 'center',
  fontFamily: 'VT323'
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

////// HEADING ONE 
////// - logo text 
////// - welcome greeting 

const headingTextBase = {
  fontFamily: 'DotGothic',
  margin: 4,
}

export const headingOneText = {
  small: {
   ...headingTextBase,
      fontSize: 50,
  },
  medium: {
    ...headingTextBase,
    fontSize: 60  
  },
  large: {
    ...headingTextBase,
    fontSize: 70  
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
    fontSize: 34  
  },
  large: {
    ...headingTextBase,
    fontSize: 44
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

////// INNER TEXT 
////// - how to play btn 
////// - go btn 

const innerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center'
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

////// SMALL INNER TEXT 
////// - available game pressables

const smInnerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center'
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
  flexGrow: 1,
  marginRight: 10,
  backgroundColor: 'white',
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
  textAlign: 'center'
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

////// SUBMIT TEXT 
////// - submit btn during gameplay

const submitTextBase = {
  fontFamily: 'VT323',
  textAlign: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
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
  paddingTop: 2
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
    fontSize: 19,
  }
}

////// WAITING TEXT 
////// - during gameplay waiting for other player alert

const waitingTextBase = {
  fontStyle: 'italic',
  textAlign: 'center',
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
