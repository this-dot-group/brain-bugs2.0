import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'

// import HowToPlay


const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150
  },
  input: {

  }

});

function Homescreen() {


  const handleGo = () => {
    console.log('Go! clicked')
  }




  return (
    <View>
      <Text>Welcome to This Game</Text>

      <Image 
        source={{uri:'https://via.placeholder.com/150'}}
        style={styles.image}/>

      <Text>Please enter your username:</Text> 

      <Input
        placeholder={'username'}
        style={styles.input} />

      <Button
        title='Go!'
        onPress={handleGo}/>
    </View>
  )
}

export default Homescreen
