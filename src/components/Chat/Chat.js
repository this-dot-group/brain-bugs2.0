import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Buttons, Views } from '../../styles';

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  closeModalButton: {
    ...Buttons.openButton,
  }
})

function Chat({ setShowChat, socket, socketId, gameCode, user }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');

  useEffect(() => {
    socket.emit('messageFetch');
    socket.on('newMessage', updatedMessages => {
      setMessages(updatedMessages)
    });
    return () => socket.off('newMessage', setMessages);
  }, [])

  const sendMessage = () => {
    socket.emit('messageSend', { gameCode, message: currMessage, ...user })
  }

  return (
    <View
      style={styles.modalView}
    >
      {messages.map(({ message, userId, timeStamp }) =>
        <Text
          key={timeStamp}
          style={{ color: userId === socketId ? 'blue' : 'green' }}
        >{message}</Text>
      )}
      <TextInput
        multiline={true}
        onChangeText={value => setCurrMesssage(value)}
        onSubmitEditing={value => {
          console.log(value.nativeEvent)
          sendMessage()
        }}
        returnKeyType="send"
        blurOnSubmit={true}
        style={{
          height: 40,
          width: 400,
          borderColor: 'gray',
          borderWidth: 1
        }}
      />

      <Pressable
        style={styles.closeModalButton}
        onPress={() => sendMessage()}
      >
        <Text>Send Message</Text>
      </Pressable>

      <Pressable
        style={styles.closeModalButton}
        onPress={() => setShowChat(false)}
      >
        <Text>X</Text>
      </Pressable>
    </View>
  )
}

const mapStateToProps = state => ({
  socket: state.socketReducer,
  socketId: state.userReducer.socketId,
})

export default connect(mapStateToProps)(Chat);