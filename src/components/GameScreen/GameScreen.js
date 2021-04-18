import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Pressable, Modal, Animated, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import he from 'he';
import { Redirect } from 'react-router-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis'


import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown'

import { Buttons, Views, Typography } from '../../styles/'

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
  }
})


function GameScreen(props) {

  const [seconds, setSeconds] = useState(1000000);
  const [modalVisible, setModalVisible] = useState(false);
  const [formattedQuestionInfo, setFormattedQuestionInfo] = useState({});
  const [score, setScore] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  // setting the states below to -1 since there will never be a -1 index position in the answer array
  const [selected, setSelected] = useState(-1);
  const [submitted, setSubmitted] = useState(-1);
  const [waiting, setWaiting] = useState(false);
  const [correctIndex, setCorrectIndex] = useState(-1);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  // const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const firstQuestion = useRef(true)

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

  // ANIMATION

  const [animation, setAnimation] = useState(new Animated.Value(0))

  const interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['grey', 'yellow']
  })

  const animatedStyle = {
    backgroundColor: interpolation
  }


  const handleAnimation = (answer, i) => {

    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {

      handleSubmitAnswer(answer, i);

    })

  }
  //needs to know if its the correct answer 
  const handleSubmitAnswer = (answer, i) => {


    // console.log('Formatted Question Info', formattedQuestionInfo)
    let questionPoints;

    answer === formattedQuestionInfo.correct_answer ?
      questionPoints = 1
      :
      questionPoints = 0;

    // console.log('Question Points: ', questionPoints)
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
    setWaiting(true);
  }

  const fakeOpponentSubmit = () => {
    props.fakeOpponentSocket.emit('userAnsweredinGame',
      {
        username: props.opponent,
        // gets question right 50% of the time
        points: Math.floor(Math.random() * 2),
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
        setWaiting(false);
        // resetting the Animated Value each time a new question comes down
        setAnimation(new Animated.Value(0))

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
      setScore(finalScore);
      setTimeout(() => {
        setGameEnd(true);
      }, 2000)
    }

    props.socket.on('question', questionHandler);
    props.socket.on('score', setScore);
    props.socket.on('endGame', endGame);

    return () => {
      props.socket.off('question', questionHandler)
      props.socket.off('score', setScore);
      props.socket.off('endGame', endGame);
    }

  }, [])

  useEffect(() => {
    console.log('seconds', seconds)
    console.log('socnds type', typeof seconds)
    if (seconds === 0) {
      console.log('emitted')
      props.socket.emit('userAnsweredinGame',
        {
          username: props.userName,
          points: 0
        })
      if (props.numPlayers === 1) {
        props.fakeOpponentSocket.emit('userAnsweredinGame',
          {
            username: props.opponent,
            points: 0
          })
      }
    }

  }, [seconds])

  useEffect(() => {
    setSeconds(10);
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
    <View>
      {formattedQuestionInfo.question &&
        <>
          <Modal
            transparent={true}
            visible={modalVisible}>

            <View
              style={styles.modalView}>
              <HowToPlayModal />
              <Pressable
                style={styles.howToPlayModalButton}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text>Hide</Text>
              </Pressable>
            </View>
          </Modal>
          <Pressable
            style={styles.howToPlayModalButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text>How To Play</Text>
          </Pressable>
          {waiting &&
            <Text> Waiting for other player to answer
              <AnimatedEllipsis />
            </Text>
          }


          <Text>{he.decode(formattedQuestionInfo.category)}</Text>

          <Text>{he.decode(formattedQuestionInfo.question)}</Text>


          {/* i is the index number of the answer in the answer arr */}

          {formattedQuestionInfo.answers.map((answer, i) =>

            <Pressable

              onPress={() => {
                setSelected(i)
              }}

              // onLongPress={() => {
              //   handleAnimation(answer, i)
              // }}

              // onLongPress={() => {
              //   handleSubmitAnswer(answer, i)
              // }}

              style={chooseColor(i)}

              key={i}
              disabled={submitted >= 0}
            >
              <Animated.View
                style={i === selected ? animatedStyle : null}>

                <Text style={styles.answerText}>{he.decode(answer)}</Text>

              </Animated.View>

            </Pressable>
          )}

          <Pressable
            onPress={() => {
              handleAnimation(formattedQuestionInfo.answers[selected], selected)
            }}
          >
            <Text>
              Submit
            </Text>
          </Pressable>

          <Text>Time Left:&nbsp;
            <Countdown
              seconds={seconds}
              setSeconds={setSeconds}
            //create a function that when the time hits zero
            />
          </Text>

          <Divider style={{ height: 1, backgroundColor: 'blue' }} />
          {score.playerOne &&
            <>
              <Text>{score.playerOne.name} {score.playerOne.score}</Text>
              <Text>{score.playerTwo.name} {score.playerTwo.score}</Text>
            </>
          }

        </>


      }
      { gameEnd &&
        <Redirect
          to={{
            pathname: '/gameend',
            state: { finalScore: score },
          }} />}
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

export default connect(mapStateToProps)(GameScreen);
