import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Modal, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from '../../../styles/styles'
import { Link } from 'react-router-native'
import { newGame, numQuestions, numPlayers, newCategory } from '../../../store/gameInfoReducer'
const axios = require('axios');

const EXPO_LOCAL_URL = '10.0.0.200' // Josh

// adding this to the server
// clean up inline styling in this file
// if one player, go to how to play screen, instead of the waiting room
// send game info to server via sockets to populate the join game screen



function StartGame(props) {

 
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async() => {
      const categories = await axios.get(`http://${EXPO_LOCAL_URL}:3000/categories`)
      let categoryListArray = categories.data.map(category => {
        return {
          label: category.name,
          value: category.id
        }
      })
      setCategoryList(categoryListArray);
    })()
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
        <View style={{ height: 200 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}


            multiple={false}
            placeholder='Select a Category'
            itemStyle={{ height: 50 }}

            onChangeItem={item => {
              props.newCategory({name: item.label, id: item.value})
            }}
            items={categoryList}
          />

        </View>
        <View style={{ height: 200 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}
            placeholder='Number of Questions'
            multiple={false}
            onChangeItem={item => {
              props.numQuestions(item.value)
            }}
            items={[
              { label: '10', value: 10 },
              { label: '15', value: 15 },
              { label: '20', value: 20 },
              { label: '25', value: 25 },
            ]}
          />
        </View>
        <View style={{ height: 200 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}
            placeholder='Number of Players'
            multiple={false}
            onChangeItem={item => {
              props.numPlayers(item.value)
            }}
            items={[
              { label: 'Single Player', value: 'Single Player' },
              { label: 'Two Players', value: 'Two Players' }
            ]}
          />

        </View>
        <Link to='/waitingroom'>
          <Text>Go!</Text>
        </Link>
      </View>
    </Modal>
  )
}

const mapDispatchToProps = { newGame, numQuestions, numPlayers, newCategory }
export default connect(null, mapDispatchToProps)(StartGame)
