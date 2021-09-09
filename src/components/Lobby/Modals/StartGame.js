import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Platform, View, Text, Modal, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import * as Notifications from 'expo-notifications';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from 'react-router-native';
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate, gameMakerPushToken } from '../../../store/gameInfoReducer';
import { newOpponent } from '../../../store/userReducer';

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
      // DOES THE BELOW REQUEST ONE MORE TIME?
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get token for push notification!');
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
    props.gameMakerPushToken(pushToken)
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
  }, []);

  useEffect(() => {
    const goButtonStatus = ['numPlayers', 'category', 'numQuestions', 'publicOrPrivate'].reduce((acc, prop) => {
      if (prop === 'publicOrPrivate' && props.gameInfo.numPlayers === 1) {
        return acc;
      }
      return props.gameInfo[prop] ? acc : false
    }, true);
    setShowGo(goButtonStatus)
  }, [
    props.gameInfo.numPlayers,
    props.gameInfo.category,  
    props.gameInfo.numPlayers,
    props.gameInfo.publicOrPrivate
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
                      if (item.value === 'public') { registerForPushNotificationsAsync() }
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
  newOpponent
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
