import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Platform, View, Text, Modal, Pressable, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native'
import * as Notifications from 'expo-notifications';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'react-router-native';
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate, pushTokenAlertInteraction, gameMakerPushToken } from '../../../store/gameInfoReducer';
import { newOpponent, pushNotificationToken } from '../../../store/userReducer';

import he from 'he';
import { Buttons, Views } from '../../../styles'
import { EXPO_LOCAL_URL } from '../../../../env'

import axios from 'axios';


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
  const [showGo, setShowGo] = useState(false); 

  const validPushToken = (pushToken) => {
    Alert.alert(
      "Thanks for enabling push notifications!",
      `If you choose to leave the app while you are waiting we will send you a push notification when your game is ready.`,
      [
        { text: "OK", onPress: () => {
          // the below is used to remember that this user has allowed push notifications so we dont keep asking
          props.pushNotificationToken(pushToken);
          // the below is to remember that the push token has been interacted with so that we can use it in the reduce method that shows the Go button
          props.pushTokenAlertInteraction('VALID')
        }}
      ],
      { cancelable: false }
    );

    props.gameMakerPushToken(pushToken)
  }

  const pushNotificationAlreadyEnabled = () => {
    // have to reset the pushToken for the game with the users token thats saved from the validToken event
    props.gameMakerPushToken(props.pushNotificationUserToken)
    props.pushTokenAlertInteraction('VALID');
  }

  const invalidPushToken = (pushToken) => {
    Alert.alert(
      "Sorry, we could not enable push notifications on your device.",
      `Please do not leave the app while waiting for an opponent.`,
      [
        { text: "OK", onPress: () => props.pushTokenAlertInteraction('INVALID') }
      ],
      { cancelable: false }
    );
    props.gameMakerPushToken('INVALID')
  }

  // the below setNotificationHandler is what allows the push notification to go through while the app is in foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // THIS WORKS, BUT IT DOESNT ASK FOR PERMISSION (on android)

  async function registerForPushNotificationsAsync() {
    let pushToken;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get token for push notification! When your game is joined you will be automatically dropped back into the app.');
        props.pushTokenAlertInteraction('INVALID');
        return;
      }
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
      
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // this emits event to the server which then checks to see if token is valid, and 
    // sends either invalidPushToken or validPushToken event back to kick off Alert to user
    props.socket.emit('checkPushToken', pushToken)


  }

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

    props.socket.on('validPushToken', validPushToken)
    props.socket.on('invalidPushToken', invalidPushToken)

    return () => {
      props.socket.off('validPushToken', validPushToken)
      props.socket.off('invalidPushToken', invalidPushToken)
    }


  }, []);

  useEffect(() => {
    const goButtonStatus = ['numPlayers', 'category', 'numQuestions', 'publicOrPrivate', 'pushTokenAlertInteraction'].reduce((acc, prop) => {
      if (prop === 'publicOrPrivate' || prop === 'pushTokenAlertInteraction' && props.gameInfo.numPlayers === 1) {
        return acc;
      }
      return props.gameInfo[prop] ? acc : false
    }, true);
    setShowGo(goButtonStatus)
  }, [
    props.gameInfo.numPlayers,
    props.gameInfo.category,  
    props.gameInfo.numPlayers,
    props.gameInfo.publicOrPrivate,
    props.gameInfo.pushTokenAlertInteraction
  ]);

  return (
    <Modal
      transparent={true}
      visible={props.modalVisible === 'start'}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
    >
      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView>

          <View
            style={styles.modalView}
          >
            <View style={{ flexDirection: 'row', flex: .2 }}>

              <Text style={{ textAlign: 'center' }}>Start a game here!!</Text>

              <Pressable
                style={styles.closeModalButton}
                onPress={() => props.setModalVisible(null)}
              >
                <Text>X</Text>
              </Pressable>

            </View>

            <View style={{ flexDirection: 'row', flex: .35 }}>
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


            <View style={{ flexDirection: 'row', flex: .35 }}>
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
                      // !props.gameInfo.gameMakerPushToken
                      props.pushNotificationUserToken === undefined 
                      ? registerForPushNotificationsAsync()
                      : pushNotificationAlreadyEnabled();
                    }}
                    items={[
                      { label: 'Public Game', value: 'public' },
                      { label: 'Private Game', value: 'private' }
                    ]}
                  />
                </View>
              }
            </View>

            <View style={{ flexDirection: 'row', flex: .1, alignSelf: 'center' }}>
              {showGo &&
                <Pressable style={{}}>
                  <Link to='/waitingroom'>
                    <Text>Go!</Text>
                  </Link>
                </Pressable>
              }
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
    gameCode: state.userReducer.gameCode,
    pushNotificationUserToken: state.userReducer.pushNotificationUserToken,
    gameInfo: state.gameInfoReducer,
  }
}
const mapDispatchToProps = {
  newGame,
  numQuestions,
  numPlayers,
  newCategory,
  publicOrPrivate,
  gameMakerPushToken,
  pushTokenAlertInteraction,
  pushNotificationToken,
  newOpponent
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
