import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Platform, View, StyleSheet, Alert, Pressable, Text } from 'react-native'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Link } from 'react-router-native';
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate, pushTokenAlertInteraction, gameMakerPushToken } from '../../../store/gameInfoReducer';
import { newOpponent, pushNotificationToken } from '../../../store/userReducer';
import { QUESTION_DROPDOWN_CHOICES } from '../../../../config';
import { PixelButton, GenericModal, DropdownMenu, Hider, TitleBar } from '../../Shared';

import he from 'he';
import { Buttons } from '../../../styles'
import { EXPO_LOCAL_URL } from '../../../../env'

import axios from 'axios';

function StartGame(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [showGo, setShowGo] = useState(false);

  const styles = StyleSheet.create({
    dropdowns: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      height: '80%'
    },
    optionBtns: {
      ...Buttons.listOptionBtns[props.screenDeviceWidth]
    },
    dropDownView: {
      ...Buttons.dropdownBtns[props.screenDeviceWidth]
    },
    goRow: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      paddingHorizontal: 30,
      position: 'absolute',
      bottom: 20,
      zIndex: 1
    },
  })

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
    if(Device.isDevice) {
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
      console.log('pushToken in startgame', pushToken);
      props.socket.emit('checkPushToken', pushToken);

    } else {
      // the below is to remember that the push token has been interacted with so that we can use it in the reduce method that shows the Go button
      props.pushTokenAlertInteraction('VALID')
    }
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
        console.error('ERROR IN STARTGAME:', e);
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
      if (prop === 'publicOrPrivate' && props.gameInfo.numPlayers === 1) {
        return acc;
      }
      if (prop === 'pushTokenAlertInteraction' && props.gameInfo.numPlayers === 1) {
        return acc;
      }
      return props.gameInfo[prop] ? acc : false
    }, true);
    setShowGo(goButtonStatus)
  }, [
    props.gameInfo.numPlayers,
    props.gameInfo.category,  
    props.gameInfo.publicOrPrivate,
    props.gameInfo.pushTokenAlertInteraction
  ]);

  return (
    <GenericModal visible={props.modalVisible === 'start'}>
      <TitleBar
        cb={() => props.setModalVisible(null)}
        deviceSize={props.screenDeviceWidth}
      >
        Create a Game
        </TitleBar>

      <View style={styles.dropdowns}>
        <View style={styles.dropDownView}>
          <PixelButton
            buttonStyle={styles.optionBtns}>
            <DropdownMenu
              items={categoryList}
              title="Select a Category"
              screenDeviceWidth={props.screenDeviceWidth}
              cb={(item) => {
                props.newCategory({ name: item.label, id: item.value });
              }}
              selected={props.gameInfo.category?.id || null}
              loading={categoryList.length === 0}
            />
          </PixelButton>
        </View>

        <View style={styles.dropDownView}>
          <PixelButton
            buttonStyle={styles.optionBtns}>
            <DropdownMenu
              items={QUESTION_DROPDOWN_CHOICES}
              title="Number of Questions"
              screenDeviceWidth={props.screenDeviceWidth}
              cb={(item) => {
                props.numQuestions(item.value);
              }}
              selected={props.gameInfo.numQuestions || null}
            />
          </PixelButton>
        </View>

        <View style={styles.dropDownView}>
          <PixelButton
            buttonStyle={styles.optionBtns}>
            <DropdownMenu
              items={[
                { label: 'Single player', value: 1 },
                { label: 'Two players', value: 2 }
              ]}
              title='Number of Players'
              screenDeviceWidth={props.screenDeviceWidth}
              cb={item => {
                props.numPlayers(item.value);
                setNumPlayers(item.value);
              }}
              selected={props.gameInfo.numPlayers || null}
            />
          </PixelButton>
        </View>

        {numPlayers === 2 && (
          <View style={styles.dropDownView}>
            <PixelButton buttonStyle={styles.optionBtns}>
              <DropdownMenu
                items={[
                  { label: 'Public game', value: 'public' },
                  { label: 'Private game', value: 'private' }
                ]}
                title='Public / Private Game'
                screenDeviceWidth={props.screenDeviceWidth}
                cb={item => {
                  props.publicOrPrivate(item.value);
                  props.pushNotificationUserToken === undefined 
                    ? registerForPushNotificationsAsync()
                    : pushNotificationAlreadyEnabled();
                }}
                selected={props.gameInfo.publicOrPrivate || null}
              />
            </PixelButton>
          </View>
        )}
      </View>

      <View style={styles.goRow}>
        <Hider
          show={showGo}
        >
          <PixelButton variant="go">
            <Pressable>
              <Link to="/waitingroom">
                <Text>Go</Text>
              </Link>
            </Pressable>
          </PixelButton>
        </Hider>
      </View>
    </GenericModal>
  );
}
const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    gameCode: state.userReducer.gameCode,
    pushNotificationUserToken: state.userReducer.pushNotificationUserToken,
    gameInfo: state.gameInfoReducer,
    screenDeviceWidth: state.userReducer.deviceWidth
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
