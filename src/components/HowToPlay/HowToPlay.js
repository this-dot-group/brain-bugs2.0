import React, { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Link } from 'react-router-native';
import { connect } from 'react-redux'


//Import Timer from Server


function HowToPlay(props) {

  useEffect(() => {
    // props.socket.on('test', message => 
    // console.log(message,'message') )

  }, [])

  return (
    <View>
      <Text> HOW TO PLAY screen with countdown </Text>

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
