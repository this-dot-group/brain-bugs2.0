import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, Modal, PermissionsAndroid } from 'react-native'
import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';

import { connect } from 'react-redux';


import styles from '../../styles/styles'


function GameScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);

  const [formattedQuestionInfo, setFormattedQuestionInfo] = useState({});

  // the function below adds the correct answer at a random index to the array of incorrect answers, return it to save later as the answerArr
  const insertCorrectAnswer = (questionObj) => {

    let answerArr = questionObj.incorrect_answers;

    let randomSpliceIndex = Math.floor(Math.random() * answerArr.length);

    answerArr.splice(randomSpliceIndex, 0, questionObj.correct_answer);

    return answerArr;
  }


  useEffect(() => {

    props.socket.emit('readyForGame');
    props.socket.on('question', questionObj => {

      let answerArr = insertCorrectAnswer(questionObj);

      questionObj.answers = answerArr;

      setFormattedQuestionInfo(questionObj);

    })

  }, [])




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
      
      <Text>{formattedQuestionInfo.category}</Text>

      <Text>{formattedQuestionInfo.question}</Text>

      
      {formattedQuestionInfo.answers.map((answer,i) => 

        <Pressable
        style={styles.openButton}
        key={i}
        >
          <Text>{answer}</Text>
        </Pressable>
      )}

      </>
     
      
      }











    </View>




  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
  }
}

export default connect(mapStateToProps)(GameScreen);
