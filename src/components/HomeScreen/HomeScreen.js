import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux';

import { newUsername } from '../../store/usernameReducer.js';

import HowToPlayModal from '../HowToPlayModal/HowToPlayModal.js';



const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  input: {

  }

});

function Homescreen(props) {

  const [ username, setUsername ] = useState('');

  const [ modalVisible, setModalVisible ] = useState(false)


  const handleGo = () => {

    props.newUsername(username);

    
  }



  return (
    <View>
      <Text>Welcome to This Game</Text>

      <Image 
        source={{uri:'https://via.placeholder.com/150'}}
        style={styles.image}/>

      <Text>Please enter your username:</Text> 

      <Input
        placeholder={'username'}
        style={styles.input}
        onChange={e => setUsername(e.target.value)} />

      <Button
        title='Go!'
        onPress={handleGo}/>

      

      {/* how to play component wrapped in Modal here, can think about moving some of this to HowToPlayModal.js component */}
      
      <Modal
        transparent={true}
        visible={modalVisible}>

        <View
          style={styles.modalView}>

          <HowToPlayModal />

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <Text>Hide</Text>

          </TouchableHighlight>

        </View>

      </Modal>


      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>How To Play</Text>
      </TouchableHighlight>




    </View>
  )
}

const mapDispatchToProps = { newUsername }

// null is currently a placeholder for mapStateToProps

export default connect( null, mapDispatchToProps)(Homescreen);
