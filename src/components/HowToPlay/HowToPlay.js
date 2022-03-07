import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'


//Import Timer from Server


function HowToPlay(props) {

  const [seconds, setSeconds] = useState(1000);
  const [goCountdown, setGoCountdown] = useState(true);


  useEffect(() => {
    
  }, [seconds])

  return (
    <View>
      <Text> HOW TO PLAY screen with countdown </Text>
      <Text>Game starting in&nbsp;
        <Countdown
          seconds={seconds}
          setSeconds={setSeconds}
          go={goCountdown}
          setGo={setGoCountdown}
        />
      </Text>
      <Text>{props.username} {props.opponent && `vs ${props.opponent}`}</Text>

      {seconds === 0 &&
        <Redirect to='/gameplay' />
      }




      <Pressable>
        <Link to='/'>
          <Text>Go Home</Text>
        </Link>
      </Pressable>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.socketReducer,
    username: state.userReducer.username,
    opponent: state.userReducer.opponent,
  }
}
export default connect(mapStateToProps)(HowToPlay)
