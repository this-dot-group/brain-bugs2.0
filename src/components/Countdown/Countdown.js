import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Typography } from '../../styles/'


const styles = StyleSheet.create({
  countdownText: {
    ...Typography.countdownText,
  },
})

function Countdown({seconds, setSeconds, stop, place}) {
  console.log('COUNTDOWN LOADED')
  console.log('FROM: ', place)

  const lastTime = useRef();
  const lastFrame = useRef();

  // prop passed from GameScreen, this resolves true when a player leaves the game during gameplay and their opponent gets the Alert that they've left and can then return to lobby. during the Alert we want to stop the countdown from running in the background.
  if(stop) {
    cancelAnimationFrame(lastFrame.current)
  }


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
