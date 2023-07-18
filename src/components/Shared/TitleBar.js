import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '../../styles';
import PixelPressable from './PixelPressable';
import { brightGreen } from '../../styles/colors';

function TitleBar({ children, cb, style, deviceSize }) {
  const makeStyles = (style) => StyleSheet.create({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
      flexDirection: 'row',
      marginBottom: 16,
      position: 'relative',
      ...style
    },
    text: {
      textAlign: 'center',
      ...Typography.headingTwoText[deviceSize]
    },
    closeModalButton: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeModalButtonText: {
      fontWeight: 'bold',
      color: brightGreen.hex
    }
  });
  
  const styles = makeStyles(style)

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
      <PixelPressable
        wrapperStyle={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
        buttonStyle={{
          width: 40,
          height: 40,
        }}
        pressableProps={{
          onPress: cb,
          style: styles.closeModalButton
        }}
      >
        <Text style={styles.closeModalButtonText}>X</Text>
      </PixelPressable>
    </View>
  );
}

export default TitleBar;