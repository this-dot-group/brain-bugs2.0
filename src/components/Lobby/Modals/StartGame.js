import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Modal, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from '../../../styles/styles'
import { Link, Redirect } from 'react-router-native'
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate } from '../../../store/gameInfoReducer'
import socketReducer from '../../../store/socketReducer'
import { newOpponent } from '../../../store/userReducer';

import he from 'he';

const axios = require('axios');

// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
const EXPO_LOCAL_URL = '192.168.0.55' // Tia
// const EXPO_LOCAL_URL = '10.0.0.199' // Chris 


function StartGame(props) {


  const [categoryList, setCategoryList] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1)
  const [joinOnePlayerRoom, setJoinOnePlayerRoom] = useState(false);

  useEffect(() => {
    (async () => {
      const categories = await axios.get(`http://${EXPO_LOCAL_URL}:3000/categories`)
      let categoryListArray = categories.data.map(category => {
        return {
          label: he.decode(category.name),
          value: category.id
        }
      })
      setCategoryList(categoryListArray);
    })()
    props.socket.on('redirectToHowToPlay', () => {
      props.newOpponent(null);
      setJoinOnePlayerRoom(true);
    });
  }, [])


  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'start'}
    >
      <View
        style={styles.modalView}
      >
        <Text>Start a game here!!</Text>
        <Pressable
          style={styles.openButton}
          onPress={() => props.setModalVisible(null)}
        >
          <Text>X</Text>
        </Pressable>
        <View style={styles.dropDownView}>
          <DropDownPicker
            containerStyle={styles.dropDownPicker}


            multiple={false}
            placeholder='Select a Category'
            itemStyle={styles.dropDownItemAtt}

            onChangeItem={item => {
              props.newCategory({ name: item.label, id: item.value })
            }}
            items={categoryList}
          />

        </View>
        <View style={styles.dropDownView}>
          <DropDownPicker
            containerStyle={styles.dropDownPicker}
            placeholder='Number of Questions'
            multiple={false}
            onChangeItem={item => {
              props.numQuestions(item.value)
            }}
            items={[
              { label: '1 - TEST', value: 1 },
              { label: '10', value: 10 },
              { label: '15', value: 15 },
              { label: '20', value: 20 },
              { label: '25', value: 25 },
            ]}
          />
        </View>
        <View style={styles.dropDownView}>
          <DropDownPicker
            containerStyle={styles.dropDownPicker}
            placeholder='Number of Players'
            multiple={false}
            onChangeItem={item => {
              props.numPlayers(item.value);
              setNumPlayers(item.value);

            }}
            items={[
              { label: 'Single Player', value: 1 },
              { label: 'Two Players', value: 2 }
            ]}
          />
        </View>


        {numPlayers === 2 &&
          <View style={styles.dropDownView}>
            <DropDownPicker
              containerStyle={styles.dropDownPicker}
              placeholder='Public or Private Game'
              multiple={false}
              onChangeItem={item => {
                props.publicOrPrivate(item.value);
              }}
              items={[
                { label: 'Public Game', value: 'public' },
                { label: 'Private Game', value: 'private' }
              ]}
            />
          </View>
        }


        {numPlayers === 1
          ?
          <Pressable
            onPress={() => props.socket.emit('joinOnePlayer', props.gameCode)}>
            <Text>Go!</Text>
          </Pressable>
          :
          <Pressable>
            <Link to='/waitingroom'>
              <Text>Go!</Text>
            </Link>
          </Pressable>}

        {joinOnePlayerRoom &&
          <Redirect to='/howtoplay' />
        }

      </View>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    gameCode: state.userReducer.gameCode

  }
}
const mapDispatchToProps = {
  newGame,
  numQuestions,
  numPlayers,
  newCategory,
  publicOrPrivate,
  newOpponent
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
