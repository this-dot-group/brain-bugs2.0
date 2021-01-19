import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Modal } from 'react-native'
import { Divider } from 'react-native-elements';
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';
import he from 'he';
import { Redirect } from 'react-router-native';

import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown'

import styles from '../../styles/styles'


function GameScreen(props) {

  const [seconds, setSeconds] = useState(1000000);
  const [modalVisible, setModalVisible] = useState(false);
  const [formattedQuestionInfo, setFormattedQuestionInfo] = useState({});
  const [score, setScore] = useState({});
  const [gameEnd, setGameEnd] = useState(false);
  const [selected, setSelected] = useState(-1);

  // the function below adds the correct answer at a random index to the array of incorrect answers, return it to save later as the answerArr
  const insertCorrectAnswer = (questionObj) => {
    // console.log('Question Obj', questionObj);
    let answerArr = questionObj.incorrect_answers;

    let randomSpliceIndex = Math.floor(Math.random() * answerArr.length);
    // console.log('Random Splice Index', randomSpliceIndex);
    answerArr.splice(randomSpliceIndex, 0, questionObj.correct_answer);

    // console.log('Answer Array ', answerArr)
    return answerArr;
  }

  //needs to know if its the correct anwser 
  const handleSubmitAnswer = (answer) => {
    console.log('Formatted Question Info', formattedQuestionInfo)
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
  }


  useEffect(() => {

    props.socket.emit('readyForGame');
    props.socket.on('question', questionObj => {

      let answerArr = insertCorrectAnswer(questionObj);

      questionObj.answers = answerArr;
      setSelected(-1);
      setFormattedQuestionInfo(questionObj);

    })
    props.socket.on('score', scoreObj => {
      console.log('score obj in client', scoreObj)
      setScore(scoreObj);
    })
    props.socket.on('endGame', finalScore => {
      setScore(finalScore);
      setGameEnd(true)
    })

  }, [])

  useEffect(() => {

    if (seconds === 0) {
      props.socket.emit('userAnsweredinGame',
        {
          username: props.userName,
          points: 0
        })
    }

  }, [seconds])

  useEffect(() => {
    setSeconds(1000000);
  }, [formattedQuestionInfo])


  return (
    <View>

      <Modal
        transparent={true}
        visible={modalVisible}>

        <View
          style={styles.modalView}>
          <HowToPlayModal />
          <Pressable
            style={styles.openButton}
            onPress={() => {
              setModalVisible(!modalVisible) 
            }}
          >
            <Text>Hide</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>How To Play</Text>
      </Pressable>

      {formattedQuestionInfo.question &&

        <>

          <Text>{he.decode(formattedQuestionInfo.category)}</Text>

          <Text>{he.decode(formattedQuestionInfo.question)}</Text>


          {formattedQuestionInfo.answers.map((answer, i) =>

            <Pressable

              onPress={() => {
                setSelected(i)
                
              }}
              onLongPress={() => {
                handleSubmitAnswer(answer)
              }}
              style={i === selected ?
                  styles.selectedAnswer
                 : styles.answerPressables
                }
              key={i}
            >
              <Text>{he.decode(answer)}</Text>
            </Pressable>
          )}
          <Text>Time Left:&nbsp;
          <Countdown
              seconds={seconds}
              setSeconds={setSeconds}
            //create a function that when the time hits zero
            />
          </Text>

          <Divider style={{height: 1, backgroundColor: 'blue'}} />
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
        pathname:'/gameend',
        state: {finalScore: score},
        }} /> }









    </View>




  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    userName: state.userReducer.username,
  }
}

export default connect(mapStateToProps)(GameScreen);
