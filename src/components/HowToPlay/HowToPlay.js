import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import { START_COUNTDOWN } from '../../../config'


//Import Timer from Server


function HowToPlay(props) {
  const [seconds, setSeconds] = useState(START_COUNTDOWN * 1000);

  const [goCountdown, setGoCountdown] = useState(true);
  const [goToGame, setGoToGame] = useState(false);


  useEffect(() => {
    if(seconds === 0) {
      setGoCountdown(false);
      setGoToGame(true)
    }
  }, [seconds])

  return (
    <View>
      <Text style={{ fontFamily: 'DotGothic', fontSize: 24, textAlign: 'center'}}> HOW TO PLAY screen with countdown </Text>
      <Text style={{ fontFamily: 'DotGothic', fontSize: 18, textAlign: 'center'}}>Game starting in&nbsp;
        <Countdown
          seconds={seconds}
          setSeconds={setSeconds}
          go={goCountdown}
          setGo={setGoCountdown}
        />
      </Text>
      <Text style={{ fontFamily: 'DotGothic', fontSize: 18, textAlign: 'center'}}>{props.username} {props.opponent && `vs ${props.opponent}`}</Text>

      {goToGame &&
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