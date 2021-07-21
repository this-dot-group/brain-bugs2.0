import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Platform, View, Text, Modal, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import { Notifications as ExpoNotifications } from "expo";
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker'
import { Link, Redirect } from 'react-router-native'
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate } from '../../../store/gameInfoReducer'
// import socketReducer from '../../../store/socketReducer'
import { newOpponent } from '../../../store/userReducer';

import he from 'he';
import { Buttons, Views } from '../../../styles'
import { EXPO_LOCAL_URL } from '../../../../env'

import axios from 'axios';



// const EXPO_LOCAL_URL = '10.0.0.200' // Josh
// const EXPO_LOCAL_URL = '192.168.0.3' // Tia
// const EXPO_LOCAL_URL = '10.0.0.199' // Chris 

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  closeModalButton: {
    ...Buttons.openButton,
  },
  dropDownView: {
    ...Views.dropDownView,
  },
  dropDownContainer: {
    ...Views.dropDownContainer,
  },
  dropDownItem: {
    height: 50,
  }
})


function StartGame(props) {


  const [categoryList, setCategoryList] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);

  // Push notification notes - DO NOT DELETE BEFORE -
  // const registerForPushNotifications = async () => {
  //   if (Constants.isDevice) {
  //     // Get the notifications permission
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS
  //     );
  
  //     let finalStatus = existingStatus;
  //     console.log('final status:', finalStatus);
  
  //     if (existingStatus !== "granted") {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  
  //     if (finalStatus !== "granted") {
  //       return;
  //     }
  
  //     // If the permission was granted, then get the token
  //     const token = await ExpoNotifications.getExpoPushTokenAsync();
  
  //     // Android specific configuration, needs the channel
  //     if (Platform.OS === "android") {
  //       ExpoNotifications.createChannelAndroidAsync("default", {
  //         name: "default",
  //         sound: true,
  //         priority: "max",
  //         vibrate: [0, 250, 250, 250],
  //       });
  //     }
  //     console.log('TOKEN', token);
  
  //     return token;
  //   }
  // };


  useEffect(() => {
    (async () => {
      try {
        const categories = await axios.get(`http://${EXPO_LOCAL_URL}:3000/categories`);
        let categoryListArray = categories.data.map(category => {
          return {
            label: he.decode(category.name),
            value: category.id
          }
        })
        setCategoryList(categoryListArray);
      } catch (e) {
        console.log(e);
      }
    })()

  }, [])


  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'start'}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
    >
      <SafeAreaView style={{flex: 1}}>

      <ScrollView>
          
      <View
        style={styles.modalView}
        >
        <View style={{ flexDirection: "row", flex: .2}}>

          <Text style={{ textAlign: "center"}}>Start a game here!!</Text>

          <Pressable
              style={styles.closeModalButton}
              onPress={() => props.setModalVisible(null)}
              >
              <Text>X</Text>
          </Pressable>

        </View>

        <View style={{ flexDirection: "row", flex: .35}}>
          <View style={styles.dropDownView}>
            <DropDownPicker
              containerStyle={styles.dropDownContainer}
              
              
              multiple={false}
              placeholder='Select a Category'
              itemStyle={styles.dropDownItem}
              
              onChangeItem={item => {
                props.newCategory({ name: item.label, id: item.value })
              }}
              items={categoryList}
              />
          </View>
          <View style={styles.dropDownView}>
            <DropDownPicker
              containerStyle={styles.dropDownContainer}
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
        </View>


        <View style={{ flexDirection: "row", flex: .35}}>
          <View style={styles.dropDownView}>
            <DropDownPicker
              containerStyle={styles.dropDownContainer}
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
                containerStyle={styles.dropDownContainer}
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

        </View>


  
        {/* <Pressable onPressIn={registerForPushNotifications()}> */}

        <View style={{ flexDirection: "row", flex: .1,alignSelf: "center"}}>

          <Pressable style={{}}>
            <Link to='/waitingroom'>
              <Text>Go!</Text>
            </Link>
          </Pressable>
        </View>

      </View>
</ScrollView>
        </SafeAreaView>
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
