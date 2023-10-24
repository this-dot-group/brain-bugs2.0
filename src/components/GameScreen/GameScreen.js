import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import he from 'he';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { playSound } from '../../store/soundsReducer';
import Countdown from '../Countdown/Countdown';
import AppStateTracker from '../AppState/AppStateTracker.js';
import { QUESTION_TIME } from '../../../config';
import { PixelPressable } from '../Shared';
import { Typography } from '../../styles';
import AnimatedView from '../Shared/AnimatedView';
import SubmitButton from './SubmitButton';
import { brightGreen, blue, red, darkBackground, darkBlue } from '../../styles/colors';
import { CustomAlert } from '../Shared/CustomAlert';
import CrawlingBugs from '../CrawlingBugs/CrawlingBugs';

function GameScreen(props) {
  const [seconds, setSeconds] = useState(QUESTION_TIME * 1000);
  const [formattedQuestionInfo, setFormattedQuestionInfo] = useState({});
  const [score, setScore] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  // setting the states below to -1 since there will never be a -1 index position in the answer array
  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(-1);
  const [allowSubmit, setAllowSubmit] = useState(true)
  const [waiting, setWaiting] = useState({ boolean: false, name: null });
  const [correctIndex, setCorrectIndex] = useState(-1);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [ansObjForRendering, setAnsObjsForRendering] = useState(null);
  const [currQuestionNum, setCurrQuestionNum] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null)
  const firstQuestion = useRef(true)
  const lastCorrect = useRef(null)
  const [backToLobby, setBackToLobby] = useState(false);
  const [goCountdown, setGoCountdown] = useState(false);
  const [opponentAnswered, setOpponentAnswered] = useState(false);
  const [openAlert_OpponentLeft, setOpenAlert_OpponentLeft] = useState(false);


  const { screenDeviceWidth } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 30,
      width: '100%',
    },
    topRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '25%',
      alignItems: 'center',
    },
    middleRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '50%',
      alignItems: 'center',
    },
    bottomRowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '25%',
      alignItems: 'center'
    },
    answerOptionPressables: {
      width: '28%',
      height: '80%',
    },
    nonSelectedAnswer: {
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      padding: 2,
    },
    questionText: {
      ...Typography.questionText[screenDeviceWidth]
    },
    answerText: {
      ...Typography.answerText[screenDeviceWidth]
    },
    scoreText: {
      ...Typography.scoreText[screenDeviceWidth]
    },
    questionCountText: {
      ...Typography.questionCountText[screenDeviceWidth]
    },
    questionTextArea: {
      padding: 10,
      width: '70%',
    },
    alertText: {
      ...Typography.headingTwoText[screenDeviceWidth],
      marginBottom: 4
    }
  });
  
  const buttonStyle = {
    height: 70,
    width: 220,
    borderColor: blue.hex
  }

  const answerText = {
    ...Typography.answerText[screenDeviceWidth]
  }





  // the function below adds the correct answer at a random index to the array of incorrect answers, return it to save later as the answerArr
  const insertCorrectAnswer = (questionObj) => {
    let answerArr = questionObj.incorrect_answers;
    let randomSpliceIndex = Math.floor(Math.random() * answerArr.length);
    setCorrectIndex(randomSpliceIndex);
    answerArr.splice(randomSpliceIndex, 0, questionObj.correct_answer);
    return answerArr;
  }

  const handleAnsPress = () => {
    if(!allowSubmit) return;
    setAllowSubmit(false);
    setTimeout(() => {
      handleSubmitAnswer(formattedQuestionInfo.answers[selected], selected);
    }, 500);
  }

  //needs to know if its the correct answer 
  const handleSubmitAnswer = (answer, i) => {
    let questionPoints;

    answer === formattedQuestionInfo.correct_answer ?
      questionPoints = Math.ceil(seconds / 1000)
      :
      questionPoints = 0;

    lastCorrect.current = questionPoints;

    props.socket.emit('userAnsweredinGame',
      {
        username: props.userName,
        points: questionPoints,
        correct: questionPoints > 0 ? true : false
      }
    )

    if (props.numPlayers === 1) {
      fakeOpponentSubmit();
    }

    setSubmitted(i);
    setWaiting({ boolean: true, name: props.userName });
  }

  const fakeOpponentSubmit = () => {
    // gets question right 50% of the time and scores a random amount
    const points = Math.floor(Math.random() * 2) * (Math.floor(Math.random() * QUESTION_TIME) + 1);
    props.fakeOpponentSocket.emit('userAnsweredinGame',
      {
        username: props.opponent,
        points,
        correct: !!points
      }
    )
  }

  const handleScore = newScore => {
    if (lastCorrect.current > 0) {
      props.playSound('positiveTone')
    } else if (lastCorrect.current === 0) {
      props.playSound('negativeTone');
    }
    setScore(newScore);
    lastCorrect.current = -1;
  }

  const handleOpponentLeftResponse = () => {
    setOpenAlert_OpponentLeft(false);
    props.socket.emit('cancelGame');
    setBackToLobby(true);
  }

  const showOpponentLeftAlert = () => {
    setGoCountdown(false);
    setOpenAlert_OpponentLeft(true);
  }

  const handleOpponentAnswered = () => setOpponentAnswered(true);

  useEffect(() => {
    props.socket.emit('readyForGame');

    if (props.numPlayers === 1) {
      props.fakeOpponentSocket.emit('readyForGame');
    }

    const questionHandler = questionObj => {

      if(!totalQuestions) {
        setTotalQuestions(questionObj.numQuestions);
      }

      setGoCountdown(false)
      setDisplayAnswer(true)

      setTimeout(() => {

        setDisplayAnswer(false);
        setCorrectIndex(-1);
        setWaiting({ boolean: false, name: null });

        setCurrQuestionNum(questionObj.numQuestions - questionObj.questionsLeft + 1)
        if (!questionObj.answers) {
          let answerArr = insertCorrectAnswer(questionObj);
          questionObj.answers = answerArr;

          let arrOfAnsObj = questionObj.answers.map((ans, i) => {
            let ansObj = {
              answer: ans,
              index: i,
            };
            return ansObj;
          });
          setAnsObjsForRendering(arrOfAnsObj)
        }
        
        setSelected(-1);
        setFormattedQuestionInfo(questionObj);
        setSubmitted(-1);
        setAllowSubmit(true);
        setOpponentAnswered(false);
        
        setGoCountdown(true)
        if (firstQuestion.current) {
          firstQuestion.current = false
        }

      }, firstQuestion.current ? 0 : 2000)
    }

    const endGame = finalScore => {
      setDisplayAnswer(true)
      handleScore(finalScore);
      setTimeout(() => {
        setGameEnd(true);
      }, 2000)
    }


    props.socket.on('question', questionHandler);
    props.socket.on('score', handleScore);
    props.socket.on('endGame', endGame);
    props.socket.on('opponentLeftDuringGame', showOpponentLeftAlert)
    props.socket.on('opponentAnswered', handleOpponentAnswered);
    

    return () => {
      props.socket.off('question', questionHandler)
      props.socket.off('score', handleScore);
      props.socket.off('endGame', endGame);
      props.socket.off('opponentLeftDuringGame', showOpponentLeftAlert);
      props.socket.off('opponentAnswered', handleOpponentAnswered);
    }

  }, [])



  useEffect(() => {
    if (seconds === 0 && submitted === -1) {
      lastCorrect.current = 0;
      props.socket.emit('userAnsweredinGame',
        {
          username: props.userName,
          points: 0
        })
      if (props.numPlayers === 1) {
        fakeOpponentSubmit()
      }
    }
  }, [seconds])

  useEffect(() => {
    setSeconds(QUESTION_TIME * 1000);
  }, [formattedQuestionInfo])

  const chooseColor = (i) => {
    const styles = { ...buttonStyle };

    if (i === selected) {
      styles.backgroundColor = blue.hex
    }
    if (i === submitted) {
      styles.backgroundColor = darkBlue.hex,
      styles.borderColor = darkBlue.hex
    }
    if( i !== correctIndex && i === submitted && displayAnswer) {
      styles.backgroundColor = red.hex,
      styles.borderColor = red.hex
    }
    if (i === correctIndex && displayAnswer) {
      styles.backgroundColor = brightGreen.hex,
      styles.borderColor = brightGreen.hex
    }
    return styles;
  }

  const chooseAnswerTextColor = (i) => {
    const styles = { ...answerText };

    if (i === submitted && displayAnswer) {
      styles.color = darkBackground.hex
    }
    if (i === correctIndex && displayAnswer) {
      styles.color = darkBackground.hex
    }
    return styles;
  };


  return (

    <AnimatedView style={styles.container} useSite="GameScreen">
      <CrawlingBugs num={2} />
      <CustomAlert 
        visible={openAlert_OpponentLeft} 
        copy={
          <Text style={styles.alertText}>
            Your opponent left! 
            Go back to lobby for new game.
          </Text>
        }
        buttons={
          <>
            <PixelPressable
              buttonStyle={{height: 60}}
              pressableProps={{
                onPress: handleOpponentLeftResponse
              }}
            >Back to Lobby</PixelPressable>
          </>
        }
      />

      {formattedQuestionInfo.question &&
        <>
          <AppStateTracker
            gameCode={props.gameCode}
            gamePhase='game_play' />

          {/* TOP ROW - ANSWER OPTION, PLAYERS AND SCORES, ANSWER OPTION */}

          <View
            style={styles.topRowView}
          >

            <View style={styles.answerOptionPressables}>
              <PixelPressable
                buttonStyle={chooseColor(ansObjForRendering[0].index)}
                borderColor={brightGreen.hex}
                pressableProps={{
                  onPress: () => setSelected(ansObjForRendering[0].index),
                  style: styles.nonSelectedAnswer,
                  key: ansObjForRendering[0].index,
                  disabled: displayAnswer || selected === 0 || submitted > -1,
                }}
              >
                <Text
                  style={chooseAnswerTextColor(ansObjForRendering[0].index)}>
                  {he.decode(ansObjForRendering[0].answer)}
                </Text>
              </PixelPressable>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {displayAnswer && (
                <Image
                source={score.playerOne.correct ? require('../../images/green-check.png') : require('../../images/red-x.png')}
                style={{ height: 20, width: 20, marginRight: 10 }} 
                />
              )}
              {!displayAnswer && (
                <View
                style={{ height: 20, width: 20, marginRight: 10 }} 
                />
              )}
              
              <View style={{ alignItems: 'center', marginRight: 20 }}>
                {score.playerOne &&
                  <>
                    <Text style={styles.scoreText}>{score.playerOne.name}</Text>
                    <Text style={styles.scoreText}>{score.playerOne.score}</Text>
                  </>
                }
              </View>

              <View style={{ alignItems: 'center', marginLeft: 20 }}>
                {score.playerOne &&
                  <>
                    <Text style={styles.scoreText}>{score.playerTwo.name}</Text>
                    <Text style={styles.scoreText}>{score.playerTwo.score}</Text>
                  </>
                }
              </View>
              {displayAnswer && (
                <Image
                source={score.playerTwo.correct ? require('../../images/green-check.png') : require('../../images/red-x.png')}
                style={{ height: 20, width: 20, marginLeft: 10 }} 
                />
              )}
              {!displayAnswer && (
                <View
                style={{ height: 20, width: 20, marginLeft: 10 }} 
                />
              )}

            </View>

            <View style={styles.answerOptionPressables}>
              <View style={{alignSelf: 'flex-end'}}>
                <PixelPressable
                  buttonStyle={chooseColor(ansObjForRendering[1].index)}
                  pressableProps={{
                    onPress: () => setSelected(ansObjForRendering[1].index),
                    style: styles.nonSelectedAnswer,
                    key: ansObjForRendering[1].index,
                    disabled: displayAnswer || selected === 1 || submitted > -1,
                  }}
                >
                  <Text
                    style={chooseAnswerTextColor(ansObjForRendering[1].index)}>
                    {he.decode(ansObjForRendering[1].answer)}
                  </Text>
                </PixelPressable>
              </View>
            </View>

          </View>

          {/* MIDDLE ROW - SUBMIT OPTION, QUESTION WITH COUNT, SUBMIT OPTION */}

          <View
            style={styles.middleRowView}
          >
              <SubmitButton
                showButton={(selected % 2 === 0) && submitted === -1 && allowSubmit}
                showWaiting={waiting.boolean === true && !opponentAnswered && displayAnswer !== true && submitted % 2 === 0}
                handleAnsPress={handleAnsPress}
                displayAnswer={displayAnswer}
                styles={styles}
              />

              <View style={styles.questionTextArea}>
                <Text style={styles.questionText}>
                  {he.decode(formattedQuestionInfo.question)}
                </Text>
                <Text style={styles.questionCountText}>{currQuestionNum} / {totalQuestions}</Text>
              </View>
              
              <SubmitButton
                showButton={(selected  === 1 || selected === 3) && submitted === -1 && allowSubmit}
                showWaiting={waiting.boolean === true && !opponentAnswered && displayAnswer !== true && (submitted === 1 || submitted === 3)}
                handleAnsPress={handleAnsPress}
                displayAnswer={displayAnswer}
                styles={styles}
              />
          </View>

            

          {/* BOTTOM ROW - ANSWER OPTION, COUNTDOWN, ANSWER OPTION */}

          <View
            style={styles.bottomRowView}
          >

            {ansObjForRendering[2] &&
              <View style={styles.answerOptionPressables}>
                <PixelPressable
                  buttonStyle={chooseColor(ansObjForRendering[2].index)}
                  pressableProps={{
                    onPress: () => setSelected(ansObjForRendering[2].index),
                    style: styles.nonSelectedAnswer,
                    key: ansObjForRendering[2].index,
                    disabled: displayAnswer || selected === 2 || submitted > -1,
                  }}
                >
                  <Text style={chooseAnswerTextColor(ansObjForRendering[2].index)}>
                    {he.decode(ansObjForRendering[2].answer)}
                  </Text>
                </PixelPressable>
              </View>
            }

            {!ansObjForRendering[2] && <View style={styles.answerOptionPressables} />}

            {!displayAnswer &&
            <Countdown
              deviceWidth={screenDeviceWidth}
              seconds={seconds}
              setSeconds={setSeconds}
              go={goCountdown}
              setGo={setGoCountdown}
            />
          }

            {ansObjForRendering[3] &&
              <View style={styles.answerOptionPressables}>
                <View style={{alignSelf: 'flex-end'}}>
                  <PixelPressable
                    buttonStyle={chooseColor(ansObjForRendering[3].index)}
                    pressableProps={{
                      onPress: () => setSelected(ansObjForRendering[3].index),
                      style: styles.nonSelectedAnswer,
                      key: ansObjForRendering[3].index,
                      disabled: displayAnswer || selected === 3 || submitted > -1,
                    }}
                  >
                    <Text style={chooseAnswerTextColor(ansObjForRendering[3].index)}>
                      {he.decode(ansObjForRendering[3].answer)}
                    </Text>
                  </PixelPressable>
                </View>
              </View>
            }

            {!ansObjForRendering[3] && <View style={styles.answerOptionPressables} />}

          </View>

          {backToLobby && <Redirect to='/lobby' />}

          {gameEnd &&
            <Redirect
              to={{
                pathname: '/gameend',
                state: { finalScore: score },
              }} />}

        </>
      }
    </AnimatedView>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    gameCode: state.userReducer.gameCode,
    fakeOpponentSocket: state.fakeOpponentSocketReducer,
    userName: state.username,
    socketId: state.userReducer.socketId,
    numPlayers: state.gameInfoReducer.numPlayers || 2,
    opponent: state.userReducer.opponent,
    screenDeviceWidth: state.userReducer.deviceWidth
  }
}

const mapDispatchToProps = { playSound }

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

