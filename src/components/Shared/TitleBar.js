import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Typography } from '../../styles';
import PixelButton  from './PixelButton';




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
    }
  });
  
  const styles = makeStyles(style)

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
      <PixelButton
        buttonStyle={{
          width: 40,
          height: 40,
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        <Pressable
          style={styles.closeModalButton}
          onPress={cb}
        >
          <Text style={styles.closeModalButtonText}>X</Text>
        </Pressable>
      </PixelButton>
    </View>
  );
}

export default TitleBar;