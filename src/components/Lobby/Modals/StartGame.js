import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native';
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate } from '../../../store/gameInfoReducer';
import { newOpponent } from '../../../store/userReducer';
import { QUESTION_DROPDOWN_CHOICES } from '../../../../config';
import { PixelButton, GenericModal, DropdownMenu, Hider, TitleBar, PixelPressable } from '../../Shared';

import he from 'he';
import { Buttons } from '../../../styles'
import { EXPO_LOCAL_URL } from '../../../../env'

import axios from 'axios';

function StartGame(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [showGo, setShowGo] = useState(false);
  const [redirect, setRedirect] = useState(null);

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
    props.gameInfo.publicOrPrivate,
  ]);

  if (redirect) return <Redirect to="/waitingroom" />

  return (
    <GenericModal visible={props.modalVisible === 'start'} disableBackground>
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
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 }
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
          <View style={{
            ...styles.dropDownView, 
            marginBottom: 0
            }}>
            <PixelButton buttonStyle={styles.optionBtns}>
              <DropdownMenu
                items={[
                  { label: 'Public', value: 'public' },
                  { label: 'Private', value: 'private' }
                ]}
                title='Public or Private?'
                screenDeviceWidth={props.screenDeviceWidth}
                cb={item => {
                  props.publicOrPrivate(item.value);
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
          <PixelPressable
            variant="go"
            pressableProps={{
              onPress: () => setRedirect(true)
            }}
          >
            Go
          </PixelPressable>
        </Hider>
      </View>
    </GenericModal>
  );
}
const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    gameCode: state.userReducer.gameCode,
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
  newOpponent
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
