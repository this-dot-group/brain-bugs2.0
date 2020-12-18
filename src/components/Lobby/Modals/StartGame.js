import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Modal, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from '../../../styles/styles'
import { Link } from 'react-router-native'
import { newGame } from '../../../store/gameInfoReducer'
const axios = require('axios');

/// Need to make functions that sets the state for the category, number of questions, and number of players.  


function StartGame(props) {

 
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [numPlayers, setNumPlayers] = useState('');

  useEffect(() => {
    (async() => {
      const categories = await axios.get('http://10.0.0.199:3000/categories')
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
            // defaultValue='category 1'

            multiple={false}
            placeholder='Select a Category'
            itemStyle={{ height: 50 }}
            // onChangeList
            onChangeItem={item => {
              // console.log(item)
              setCategory(item.value)

            }}
            items={categoryList}
          />

        </View>
        <View style={{ height: 200 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}
            // defaultValue={10}
            placeholder='Number of Questions'
            multiple={false}
            onChangeItem={item => {
              // console.log(item)
              setNumQuestions(item.value)
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
            // defaultValue={'Two Players'}
            placeholder='Number of Players'
            multiple={false}
            onChangeItem={item => {
              // console.log(item)
              setNumPlayers(item.value)

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

const mapDispatchToProps = { newGame }
export default connect(null, mapDispatchToProps)(StartGame)
