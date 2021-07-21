import React, { useEffect, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Typography } from '../../styles/'


const styles = StyleSheet.create({
  countdownText: {
    ...Typography.countdownText,
  },
})

function Countdown(props) {

  useEffect(() => {
    const myInterval = setInterval(() => {
      props.setSeconds((seconds) => seconds - 1);
    }, 1000)
    if (props.seconds === 0) {
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  });
  
  return (<Text style={styles.countdownText}>{props.seconds}</Text>);

}

export default memo(Countdown)
