import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link } from 'react-router-native';
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'


//Import Timer from Server


function HowToPlay(props) {

  const [seconds, setSeconds] = useState(3);


  useEffect(() => {
    
  }, [seconds])

  return (
    <View>
      <Text> HOW TO PLAY screen with countdown </Text>
      <Text>Game starting in&nbsp;
        <Countdown
        seconds={seconds}
        setSeconds={setSeconds}
        />
      </Text>

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
    socket: state.socketReducer
  }
}
export default connect(mapStateToProps)(HowToPlay)
