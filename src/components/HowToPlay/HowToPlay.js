import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'


//Import Timer from Server


function HowToPlay(props) {
  console.log('props.userName in HowToPlay:', props.username)
  console.log('props.opponent in HowToPlay:', props.opponent)

  const [seconds, setSeconds] = useState(1000);


  useEffect(() => {
    
  }, [seconds])

  return (
    <View>
      <Text> HOW TO PLAY screen with countdown </Text>
      <Text>Game starting in&nbsp;
        <Countdown
          seconds={seconds}
          setSeconds={setSeconds}
          place="HowToPlay"
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
