import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Modal, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from '../../../styles/styles'
import { Link, Redirect } from 'react-router-native'
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate } from '../../../store/gameInfoReducer'
import socketReducer from '../../../store/socketReducer'
const axios = require('axios');

const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.55' // Tia
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
          label: category.name,
          value: category.id
        }
      })
      setCategoryList(categoryListArray);
    })()
    props.socket.on('redirectToHowToPlay', () => {
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
        <View style={{ height: 100 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}


            multiple={false}
            placeholder='Select a Category'
            itemStyle={{ height: 50 }}

            onChangeItem={item => {
              props.newCategory({ name: item.label, id: item.value })
            }}
            items={categoryList}
          />

        </View>
        <View style={{ height: 100 }}>
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
        <View style={{ height: 100 }}>
          <DropDownPicker
            containerStyle={{ height: 40, width: 200 }}
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
          <View style={{ height: 100 }}>
            <DropDownPicker
              containerStyle={{ height: 40, width: 200 }}
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
const mapDispatchToProps = { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate }

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
