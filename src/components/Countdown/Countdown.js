import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Typography } from '../../styles/'


const getStyles = (style = {}) => StyleSheet.create({
  countdownText: {
    ...Typography.countdownText,
    ...style
  },
})

function Countdown({seconds, setSeconds, go, setGo, style}) {

  const styles = getStyles(style)

  const lastTime = useRef();
  const lastFrame = useRef();

  // prop passed from GameScreen, this resolves true when a player leaves the game during gameplay and their opponent gets the Alert that they've left and can then return to lobby. during the Alert we want to stop the countdown from running in the background.
  
  useEffect(() => {
    if(!go) {
      lastTime.current = null;
      cancelAnimationFrame(lastFrame.current)
      lastFrame.current = null;
    }
    else if (go) {
      lastFrame.current = requestAnimationFrame(animate);
    }
  }, [go])

  const animate = time => {
    let timeLeft = true;
    if(lastTime.current && go) {
      let timePassed = time - lastTime.current;
      setSeconds(sec => {
        if(!go) return sec;
        let newTime = sec - timePassed;
        if(newTime <= 0) {
          cancelAnimationFrame(lastFrame.current);
          lastFrame.current = null;
          setGo(false);
          timeLeft = false;
          return 0;
        }
        return newTime;
      });
    }
    if(go) {
      lastTime.current = time;
    } else {
      lastTime.current = null;
      cancelAnimationFrame(lastFrame.current);
      lastFrame.current = null;
    }
    if(lastFrame.current && timeLeft && go) {
      lastFrame.current = requestAnimationFrame(animate);
    }
  }

  useEffect(() => {
    if(go) {
      lastFrame.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(lastFrame.current);
  }, [])

  
  return (<Text style={styles.countdownText}>{Math.ceil(seconds/1000)}</Text>);

}

export default Countdown;
