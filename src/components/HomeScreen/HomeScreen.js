import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'




const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150
  },
  input: {

  }

});

function Homescreen() {

  const [ username, setUsername ] = useState('')


  const handleGo = () => {

    
    console.log('Go! clicked')
    console.log(username)
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
        style={styles.input}
        onChange={e => setUsername(e.target.value)} />

      <Button
        title='Go!'
        onPress={handleGo}/>
    </View>
  )
}

export default Homescreen
