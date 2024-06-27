import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Redirect } from 'react-router-native';
import { newGame, numQuestions, numPlayers, newCategory, publicOrPrivate } from '../../../../store/gameInfoReducer';
import { newOpponent } from '../../../../store/userReducer';
import { getCategories } from '../../../../store/categoriesReducer';
import { QUESTION_DROPDOWN_CHOICES } from '../../../../../config';
import { PixelButton, GenericModal, DropdownMenu, Hider, TitleBar, PixelPressable } from '../../../Shared';

import { Buttons } from '../../../../styles'

function StartGame({
  screenDeviceWidth,
  gameInfo,
  modalVisible,
  setModalVisible,
  newCategory,
  numQuestions,
  numPlayers: numPlayersStoreUpdate,
  publicOrPrivate,
  getCategories,
  categories,
}) {
  const [numPlayers, setNumPlayers] = useState(1);
  const [showGo, setShowGo] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const styles = StyleSheet.create({
    dropdowns: {
      display: 'flex',
      position: 'relative',
      zIndex: 1,
      height: '80%',
    },
    dropdownsContainerStyles : {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '100%',
    },
    optionBtns: {
      ...Buttons.createGameListOptionBtns[screenDeviceWidth],
    },
    dropDownView: {
      ...Buttons.dropdownBtns[screenDeviceWidth],
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
    getCategories();
  }, []);

  useEffect(() => {
    const goButtonStatus = ['numPlayers', 'category', 'numQuestions', 'publicOrPrivate'].reduce((acc, prop) => {
      if (prop === 'publicOrPrivate' && gameInfo.numPlayers === 1) {
        return acc;
      }
      return gameInfo[prop] ? acc : false
    }, true);
    setShowGo(goButtonStatus)
  }, [
    gameInfo.numPlayers,
    gameInfo.category,  
    gameInfo.numQuestions,
    gameInfo.publicOrPrivate,
  ]);

  if (redirect) return <Redirect to="/waitingroom" />

  return (
    <GenericModal visible={modalVisible === 'start'} disableBackground>
      <TitleBar
        cb={() => setModalVisible(null)}
        deviceSize={screenDeviceWidth}
      >
        Create a Game
      </TitleBar>

      <ScrollView
        style={styles.dropdowns} // flex
        contentContainerStyle={styles.dropdownsContainerStyles}
      >
        <View style={styles.dropDownView}>
          <PixelButton
            buttonStyle={styles.optionBtns}>
            <DropdownMenu
              items={categories}
              title="Select a Category"
              screenDeviceWidth={screenDeviceWidth}
              cb={(item) => {
                newCategory({ name: item.label, id: item.value });
              }}
              selected={gameInfo.category?.id || null}
              loading={categories.length === 0}
            />
          </PixelButton>
        </View>

        <View style={styles.dropDownView}>
          <PixelButton
            buttonStyle={styles.optionBtns}>
            <DropdownMenu
              items={QUESTION_DROPDOWN_CHOICES}
              title="Number of Questions"
              screenDeviceWidth={screenDeviceWidth}
              cb={(item) => {
                numQuestions(item.value);
              }}
              selected={gameInfo.numQuestions || null}
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
              screenDeviceWidth={screenDeviceWidth}
              cb={item => {
                numPlayersStoreUpdate(item.value);
                setNumPlayers(item.value);
              }}
              selected={gameInfo.numPlayers || null}
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
                screenDeviceWidth={screenDeviceWidth}
                cb={item => {
                  publicOrPrivate(item.value);
                }}
                selected={gameInfo.publicOrPrivate || null}
              />
            </PixelButton>
          </View>
        )}
      </ScrollView>

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
    screenDeviceWidth: state.userReducer.deviceWidth,
    categories: state.categoriesReducer,
  }
}
const mapDispatchToProps = {
  newGame,
  numQuestions,
  numPlayers,
  newCategory,
  publicOrPrivate,
  newOpponent,
  getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGame)
