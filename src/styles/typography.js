import { red } from "./colors";

export const input = {
  padding: 4
};

export const alertText = {
  color: 'red',
};

export const answerText = {
  fontSize: 20,
  textAlign: 'center',
};

export const questionText = {
  fontSize: 35,
  textAlign: 'center',
  marginTop: 5,
  paddingLeft: 30,
  paddingRight: 30
};

export const categoryText = {
  fontSize: 15,
};

export const countdownText = {
  fontSize: 15,
  fontWeight: "bold",
  color: "red",
  textAlign: 'center',
};

////// HEADING ONE /////////////
////// - logo text /////////////
////// - welcome greeting //////

const headingTextBase = {
  fontFamily: 'DotGothic',
  margin: 4,
}

export const headingOneText = {
  small: {
   ...headingTextBase,
      fontSize: 50
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

////// HEADING TWO /////////////
////// - logo text /////////////
////// - welcome greeting //////

export const headingTwoText = {
  small: {
   ...headingTextBase,
      fontSize: 28
  },
  medium: {
    ...headingTextBase,
    fontSize: 38  
  },
  large: {
    ...headingTextBase,
    fontSize: 48  
  }
}

////// INNER TEXT //////////////
////// - how to play btn ///////
////// - go btn ////////////////

const innerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center'
}

export const innerText = {
  small: {
    ...innerTextBase,
    fontSize: 14
  },
  medium: {
    ...innerTextBase,
    fontSize: 22
  },
  large: {
    ...innerTextBase,
    fontSize: 24 // ? need to test
  }
}

////// INPUT TEXT //////////////
////// - input placeholder /////

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
    fontSize: 14
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

////// NORMAL TEXT //////////////////////
////// - how to play modal bullet pts ///

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
