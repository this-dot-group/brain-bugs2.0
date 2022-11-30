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

////// BIG HEADING /////////////
////// - logo text /////////////
////// - welcome greeting //////

const headingTextBase = {
  fontFamily: 'DotGothic',
  margin: 10
}

export const smHeadingText = {
  ...headingTextBase,
  fontSize: 54,
}

export const mdHeadingText = {
  ...headingTextBase,
  fontSize: 64, // ?
}

export const lgHeadingText = {
  ...headingTextBase,
  fontSize: 74, // ?
}

////// INNER TEXT //////////////
////// - how to play btn ///////

const innerTextBase = {
  fontFamily: 'DotGothic',
  marginTop: 'auto',
  marginBottom: 'auto',
  textAlign: 'center'
}

export const smInnerText = {
  ...innerTextBase,
  fontSize: 14
}

export const mdInnerText = {
  ...innerTextBase,
  fontSize: 24 // ? need to test
}

export const lgInnerText = {
  ...innerTextBase,
  fontSize: 34 // ? need to test
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

export const smInputText = {
  ...inputTextBase,
  fontSize: 14,
}

export const mdInputText = {
  ...inputTextBase,
  fontSize: 24 // ?
}

export const lgInputText = {
  ...inputTextBase,
  fontSize: 34 // ?
}