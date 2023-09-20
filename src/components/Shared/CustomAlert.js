import React from 'react'
import { View, StyleSheet } from 'react-native'
import GenericModal from './GenericModal'
import { brightRed } from '../../styles/colors';


export function CustomAlert({ copy, buttons, visible, addtlButtonStyle }) {

  const styles = StyleSheet.create({
    addtlModalStyle: {
      width: '70%',
      borderColor: brightRed.hex
    },
    copySectionStyle: {
      height: '75%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    btnSectionStyle: {
      height: '25%',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 20,
      ...addtlButtonStyle
    }
  });

  return (
    <GenericModal visible={visible} style={styles.addtlModalStyle} disableBackground>
      <View style={styles.copySectionStyle}>
        {copy}
      </View>
      <View style={styles.btnSectionStyle}>
        {buttons}
      </View>
    </GenericModal>
  )
}