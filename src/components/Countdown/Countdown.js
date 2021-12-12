import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Typography } from '../../styles/'


const styles = StyleSheet.create({
  countdownText: {
    ...Typography.countdownText,
  },
})

function Countdown({seconds, setSeconds}) {

  const lastTime = useRef();
  const lastFrame = useRef();

  // TODO: we told countdown to stop
  //           cancelAnimationFrame(lastFrame.current);


  const animate = time => {
    if(lastTime.current) {
      let timePassed = time - lastTime.current;
      setSeconds(sec => {
        let newTime = sec - timePassed;
        if(newTime < 0) {
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

  
  return (<Text style={styles.countdownText}>{Math.ceil(seconds/1000)}</Text>);

}

export default Countdown;
