import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'


export default function Countdown(props) {
  // const [seconds, setSeconds] = useState(props.seconds);


  useEffect(() => {
    const myInterval = setInterval(() => {
      props.setSeconds((seconds) => seconds - 1);
    }, 1000)
    if (props.seconds === 0) {
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  });

  return (<Text>{props.seconds}</Text>);

}
