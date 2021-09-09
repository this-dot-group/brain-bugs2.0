import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Typography } from '../../styles/'


const styles = StyleSheet.create({
  countdownText: {
    ...Typography.countdownText,
  },
})

function Countdown(props) {

  const lastTime = useRef();
  const lastFrame = useRef();

  const animate = time => {
    if(lastTime.current) {
      let timePassed = time - lastTime.current;
      props.setSeconds(sec => {
        let newTime = sec - timePassed;
        if(newTime < 0) {
          cancelAnimationFrame(lastFrame.current);
          lastFrame.current = null;
          return 0;
        }
        return newTime;
      });
    }
    lastTime.current = time;
    if(lastFrame.current) {
      lastFrame.current = requestAnimationFrame(animate);
    }
  }

  useEffect(() => {
    lastFrame.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(lastFrame.current);
    }
  }, [])

  
  return (<Text style={styles.countdownText}>{Math.ceil(props.seconds/1000)}</Text>);

}

export default Countdown;
