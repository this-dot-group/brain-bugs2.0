import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography } from '../../styles';
import CloseModalButton from './CloseModalButton';

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
  });
  
  const styles = makeStyles(style)

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
      <CloseModalButton
        cb={cb}
        wrapperStyle={{ 
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
    </View>
  );
}

export default TitleBar;