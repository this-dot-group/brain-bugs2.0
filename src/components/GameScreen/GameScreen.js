import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import he from 'he';
import { Redirect } from 'react-router-native';

import { connect } from 'react-redux';
import { playSound } from '../../store/soundsReducer'
import Countdown from '../Countdown/Countdown'

import { Buttons, Views, Typography } from '../../styles/'

const QUESTION_TIME = 10;

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  selectedAnswer: {
    ...Buttons.selectedAnswer,
    flex: 1, 
    borderRadius: 30, 
    margin: 10, 
    justifyContent: "center"
  },
  answerOptionPressables: {
    ...Buttons.answerPressables,
    flex: 1, 
    borderRadius: 30, 
    margin: 10, 
    justifyContent: "center"
  },
  submittedAnswer: {
    ...Buttons.submittedAnswer,
    flex: 1, 
    borderRadius: 30, 
    margin: 10, 
    justifyContent: "center"
  },
  correctAnswer: {
    ...Buttons.correctAnswer,
    flex: 1, 
    borderRadius: 30, 
    margin: 10, 
    justifyContent: "center"
  },
  howToPlayModalButton: {
    ...Buttons.openButton
  },
  answerText: {
    ...Typography.answerText,
  },
  questionText: {
    ...Typography.questionText,
  },
  categoryText: {
    ...Typography.categoryText,
  },
  submitButton: {
    ...Buttons.submitButton,
    height: "50%"
  }
})


function GameScreen(props) {

  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const [formattedQuestionInfo, setFormattedQuestionInfo] = useState({});
  const [score, setScore] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  // setting the states below to -1 since there will never be a -1 index position in the answer array
  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(-1);

  // ---------------------------------------------------------
  // ----------- WAITING STUFF -------------------------------
  // ---------------------------------------------------------

  // const [waiting, setWaiting] = useState(false);
  // {waiting &&
  //   <Text>WE WILL USE THIS FOR ICON NEXT TO PLAYER NAME</Text>
  // }

  // ---------------------------------------------------------
  // ---------------------------------------------------------

  const [correctIndex, setCorrectIndex] = useState(-1);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  // const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [ansObjForRendering, setAnsObjsForRendering] = useState(null);
  const firstQuestion = useRef(true)
  const lastCorrect = useRef(null)

  // the function below adds the correct answer at a random index to the array of incorrect answers, return it to save later as the answerArr
  const insertCorrectAnswer = (questionObj) => {
    let answerArr = questionObj.incorrect_answers;
    let randomSpliceIndex = Math.floor(Math.random() * answerArr.length);
    setCorrectIndex(randomSpliceIndex);
    answerArr.splice(randomSpliceIndex, 0, questionObj.correct_answer);
    return answerArr;
  }

 
  const handleAnsPress = (answer, i) => {
    setTimeout(() => {
      handleSubmitAnswer(answer, i);
    }, 500)
  }

  //needs to know if its the correct answer 
  const handleSubmitAnswer = (answer, i) => {

    let questionPoints;

    answer === formattedQuestionInfo.correct_answer ?
      questionPoints = seconds
      :
      questionPoints = 0;
    
    lastCorrect.current = questionPoints;

    props.socket.emit('userAnsweredinGame',
      {
        username: props.userName,
        points: questionPoints
      }
    )

    if (props.numPlayers === 1) {
      fakeOpponentSubmit();
    }

    setSubmitted(i);
    // setWaiting(true);
  }

  const fakeOpponentSubmit = () => {
    props.fakeOpponentSocket.emit('userAnsweredinGame',
      {
        username: props.opponent,
        // gets question right 50% of the time and scores a random amount
        points: Math.floor(Math.random() * 2) * (Math.floor(Math.random() * QUESTION_TIME) + 1),
      }
    )
  }


  useEffect(() => {

    props.socket.emit('readyForGame');

    if (props.numPlayers === 1) {
      props.fakeOpponentSocket.emit('readyForGame');
    }

    const questionHandler = questionObj => {

      console.log('questionObj', questionObj)

      setDisplayAnswer(true)

      setTimeout(() => {

        setDisplayAnswer(false);
        setCorrectIndex(-1);
        // setWaiting(false);

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

          console.log('WEIRDWEIRD:  ', arrOfAnsObj)
          setAnsObjsForRendering(arrOfAnsObj)
        }

        setSelected(-1);
        setFormattedQuestionInfo(questionObj);
        setSubmitted(-1);
 
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

    return () => {
      props.socket.off('question', questionHandler)
      props.socket.off('score', handleScore);
      props.socket.off('endGame', endGame);
    }

  }, [])

  const handleScore = newScore => {
    if (lastCorrect.current > 0) {
      props.playSound('positiveTone')
    } else if (lastCorrect.current === 0) {
      props.playSound('negativeTone');
    }
    setScore(newScore);
    lastCorrect.current = -1;
  }

  useEffect(() => {
    if (seconds === 0) {
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
    setSeconds(QUESTION_TIME);
  }, [formattedQuestionInfo])

  const chooseColor = (i) => {

    let color = i === selected ? styles.selectedAnswer : styles.answerOptionPressables;

    if (i === submitted) {
      color = styles.submittedAnswer
    }
    if (i === correctIndex && displayAnswer) {
      color = styles.correctAnswer;
    }
    return color;
  }

  return (

    <View
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    }}
  >

    {formattedQuestionInfo.question &&
    <>

    {/* TOP ROW */}

    <View
      style={{ flexDirection: "row", flex: .25}}
    >
      
      <View style={{ flex: .41, flexDirection: "row" }}>
        <Pressable 
          onPress={() => {
            setSelected(ansObjForRendering[0].index)
          }}
          style={chooseColor(ansObjForRendering[0].index)}
    
          key={ansObjForRendering[0].index}
          disabled={submitted >= 0}>
          <Text 
            style={styles.answerText}>
              {he.decode(ansObjForRendering[0].answer)}
          </Text>
        </Pressable>  
      </View> 


      <View style={{ flex: .18, alignItems: "center", marginTop: 20 }}>
      {score.playerOne &&
       <>
        <Text>{score.playerOne.name}</Text>
        <Text>{score.playerOne.score}</Text>
       </>
       } 
      </View>  

      <View style={{ flex: .41, flexDirection: "row" }}>
        <Pressable 
          onPress={() => {
            setSelected(ansObjForRendering[1].index)
          }}
          style={chooseColor(ansObjForRendering[1].index)}
    
          key={ansObjForRendering[1].index}
          disabled={submitted >= 0}>
          <Text 
            style={styles.answerText}>
              {he.decode(ansObjForRendering[1].answer)}
          </Text>
        </Pressable>  
      </View>

    </View>

    {/* SUBMIT AND QUESTION ROW */}

    <View
      style={{ flexDirection: "row", flex: .40 }}
    >
     {selected === 0 || selected === 2 ? 
      <View style={{ flex: .15, justifyContent: "center"}}>
        <Pressable
          onPress={() => {
            handleAnsPress(formattedQuestionInfo.answers[selected], selected)
          }}
          style={styles.submitButton}
          >
          <Text
            style={styles.answerText}>
            Submit
          </Text>
        </Pressable>
      </View> 
      : <View style={{ flex: .15 }} /> }

      <View style={{ flex: .70, alignItems: "center" }}>
        <Text style={styles.categoryText}>
          {he.decode(formattedQuestionInfo.category)}
        </Text>
        <Text style={styles.questionText}>
          {he.decode(formattedQuestionInfo.question)}
        </Text>
      </View>
      
      {selected === 1 || selected === 3 ? 
      <View style={{ flex: .15, justifyContent: "center"}}>
        <Pressable
          onPress={() => {
            handleAnsPress(formattedQuestionInfo.answers[selected], selected)
          }}
          style={styles.submitButton}
          >
          <Text
            style={styles.answerText}>
            Submit
          </Text>
        </Pressable>
      </View> 
      : <View style={{ flex: .15 }} /> }

    </View>

    {/* COUNTDOWN ROW */}
    <View
      style={{ flexDirection: "row", flex: .10 }}
    >
      <View style={{ flex: .45 }} />
      <View style={{ flex: .10 }}>
        <Countdown
          seconds={seconds}
          setSeconds={setSeconds}
          style={{color: "red" }}
        />
      </View>  
      <View style={{ flex: .45 }} />
    </View>

    {/* BOTTOM ROW */}

    <View
      style={{ flexDirection: "row", flex: .25}}
    >

    {ansObjForRendering[2] &&  
      <View style={{ flex: .41, flexDirection: "row" }}>
        <Pressable 
          onPress={() => {
            setSelected(ansObjForRendering[2].index)
          }}
          style={chooseColor(ansObjForRendering[2].index)}
    
          key={ansObjForRendering[2].index}
          disabled={submitted >= 0}>
          <Text 
            style={styles.answerText}>
              {he.decode(ansObjForRendering[2].answer)}
          </Text>
        </Pressable>  
      </View>
    }

    {!ansObjForRendering[2] &&  <View style={{ flex: .41, flexDirection: "row" }} />}

      <View style={{ flex: .18, alignItems: "center", justifyContent: "flex-end", marginBottom: 20 }}>
      {score.playerOne &&
       <>
        <Text>{score.playerTwo.name}</Text>
        <Text>{score.playerTwo.score}</Text>
       </>
       } 
      </View>  

    {ansObjForRendering[3] &&
      <View style={{ flex: .41, flexDirection: "row" }}>
        <Pressable 
          onPress={() => {
            setSelected(ansObjForRendering[3].index)
          }}
          style={chooseColor(ansObjForRendering[3].index)}
    
          key={ansObjForRendering[3].index}
          disabled={submitted >= 0}>
          <Text 
            style={styles.answerText}>
              {he.decode(ansObjForRendering[3].answer)}
          </Text>
        </Pressable>  
      </View>
    } 

    {!ansObjForRendering[3] &&  <View style={{ flex: .41, flexDirection: "row" }} />}

    </View>

     {/* { gameEnd &&
        <Redirect
          to={{
            pathname: '/gameend',
            state: { finalScore: score, socketIdRef: props.socket.id },
          }} />} */}

    </>
  }

  </View>

  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    fakeOpponentSocket: state.fakeOpponentSocketReducer,
    userName: state.userReducer.username,
    numPlayers: state.gameInfoReducer.numPlayers || 2,
    opponent: state.userReducer.opponent,
  }
}

const mapDispatchToProps = { playSound }

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

