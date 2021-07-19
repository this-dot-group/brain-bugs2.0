import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Pressable, Modal, Animated, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import he from 'he';
import { Redirect } from 'react-router-native';
// import AnimatedEllipsis from 'react-native-animated-ellipsis'


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
    ...Buttons.selectedAnswer
  },
  answerOptionPressables: {
    ...Buttons.answerPressables,
  },
  submittedAnswer: {
    ...Buttons.submittedAnswer,
  },
  correctAnswer: {
    ...Buttons.correctAnswer,
  },
  howToPlayModalButton: {
    ...Buttons.openButton
  },
  answerText: {
    ...Typography.answerText,
  },
  submitButton: {
    ...Buttons.submitButton,
  }
})


function GameScreen(props) {

  // console.log('PROPS IN GAMEPLAY SCREEN:     ', props.socket)

  const [seconds, setSeconds] = useState(QUESTION_TIME);
  const [modalVisible, setModalVisible] = useState(false);
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
  const firstQuestion = useRef(true)
  const lastCorrect = useRef(null)

  // the function below adds the correct answer at a random index to the array of incorrect answers, return it to save later as the answerArr
  const insertCorrectAnswer = (questionObj) => {
    console.log('Question Obj', questionObj);
    let answerArr = questionObj.incorrect_answers;

    let randomSpliceIndex = Math.floor(Math.random() * answerArr.length);
    console.log('Random Splice Index', randomSpliceIndex);
    setCorrectIndex(randomSpliceIndex);
    answerArr.splice(randomSpliceIndex, 0, questionObj.correct_answer);

    console.log('Answer Array ', answerArr)
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

  // DO WE STILL WANT TO INCLUDE THE CATEGORY SOMEWHERE? ABOVE QUESTION?
  // <Text>{he.decode(formattedQuestionInfo.category)}</Text>


  return (
    <View
      style={{
        display: 'grid',
        backgroundColor: "tan",
        gridTemplateColumns: '15% 26% 18% 26% 15%',
        gridTemplateRows: '15% 60% 10% 15%',
        gridTemplateAreas: `'pressable0 answer0 player1 answer1 pressable1' 'submit1 question question question submit2' '. . countdown . . ' 'pressable2 answer2 player2 answer3 pressable3'`,
        // justifyItems: 'stretch',
        width: '100%',
        height: '100%'
      }}>

      <View style={{ gridColumn: "1/2", gridRow: "1/2", backgroundColor: "red" }}>
        <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>

      </View> 
      <View style={{ backgroundColor: "grey" }}>
      <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>
        <Text>HIHIHI</Text>
        </View>
      <View style={{ gridArea: "answer1", backgroundColor: "purple" }} />
      <View style={{ gridArea: "submit2", backgroundColor: "blue" }} />
      <View style={{ gridArea: "answer2", backgroundColor: "purple" }} />

      <View style={{ gridArea: "submit1", backgroundColor: "blue" }} />
      <View style={{ gridArea: "question", backgroundColor: "black" }} />
      <View style={{ gridArea: "answer4", backgroundColor: "purple" }} />
      <View style={{ gridArea: "player1", backgroundColor: "green" }} />

      <View style={{ gridArea: "pressable3", backgroundColor: "red" }} />
      <View style={{ gridArea: "answer3", backgroundColor: "purple" }} />
      <View style={{ gridArea: "player2", backgroundColor: "green" }} />
      <View style={{ gridArea: "pressable2", backgroundColor: "red" }} />
      <View style={{ gridArea: "pressable4", backgroundColor: "red" }} />

{/* 
      {formattedQuestionInfo.question &&
        <>




          {formattedQuestionInfo.answers.map((answer, i) =>

          <>
            <View
              key={i}
              style={{ gridArea: `pressable${i}`, backgroundColor: "yellow" }}
            >
              <Pressable

                onPress={() => {
                  setSelected(i)
                }}

                style={chooseColor(i)}

                
                disabled={submitted >= 0}
              />
            </View>

            <View
              key={`${i}_answer`}
              style={{ gridArea: `answer${i}` }}
            >
              <Text style={styles.answerText}>{he.decode(answer)}</Text>
            </View>
          </>  

          )}



          <View
            style={{ gridArea: 'submit1' }}
          >
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

          <View
          style={{ gridArea: 'question', backgroundColor: "purple" }}>
          <Text>{he.decode(formattedQuestionInfo.question)}</Text>
        </View>


          {score.playerOne &&
            <>
              <View
                key={`1`}
                style={{ gridArea: 'player1', backgroundColor: "pink" }}>
                <Text>{score.playerOne.name} {score.playerOne.score}</Text>
              </View>

              <View
                key={`2`}
                style={{ gridArea: 'player2', backgroundColor: "pink"  }}>
                <Text>{score.playerTwo.name} {score.playerTwo.score}</Text>
              </View>
            </>
          }
          <View
          // gridArea="countdown"
            style={{ gridArea: 'countdown' }}
          >
            <Countdown
              seconds={seconds}
              setSeconds={setSeconds}
            />
          </View>

        </>


      }
      { gameEnd &&
        <Redirect
          to={{
            pathname: '/gameend',
            state: { finalScore: score, socketIdRef: props.socket.id },
          }} />} */}
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

