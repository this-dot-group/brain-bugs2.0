import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Buttons, Views, Chat as ChatStyles } from '../../styles';
import KeyboardAvoidingComponent from './KeyboardAvoiding';

const styles = StyleSheet.create({
  modalView: {
    ...Views.modalView,
  },
  closeModalButton: {
    ...Buttons.openButton,
  },
  ...ChatStyles,
})

function Chat({ setShowChat, socket, socketId, gameCode, user, setUnseenMessages }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');
  const scrollViewRef = useRef();
  const textInputRef = useRef();

  useEffect(() => {
    setUnseenMessages(0);
    socket.emit('messageFetch');
    socket.on('newMessage', messageHandler);
    return () => socket.off('newMessage', messageHandler);
  }, [])
  
  const messageHandler = updatedMessages => {
    socket.emit('messageSeen');
    setMessages(updatedMessages);
    setUnseenMessages(0);
  }

  const sendMessage = () => {
    socket.emit('messageSend', { gameCode, message: currMessage, ...user });
    setCurrMesssage('');
    textInputRef.current.clear();
  }

  const hideModal = () => {
    socket.emit('messageSeen');
    setShowChat(false);
  }

  return (
    <View
      style={styles.modalView}
    >
      <KeyboardAvoidingComponent>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
          {messages.map(({ message, userId, timeStamp }) =>
            <Text
              key={timeStamp}
              style={
                userId === socketId
                ? {...styles.messages}
                : {...styles.messages, ...styles.opponentMessages}
              }
            >{message}</Text>
          )}
          </ScrollView>
        <TextInput
          multiline={true}
          onChangeText={value => setCurrMesssage(value)}
          ref={textInputRef}
          onSubmitEditing={() => {
            sendMessage();
          }}
          returnKeyType="send"
          blurOnSubmit={true}
          style={{
            height: 40,
            width: 500,
            borderColor: 'gray',
            borderWidth: 1
          }}
        />
      </KeyboardAvoidingComponent>

      <Pressable
        style={styles.closeModalButton}
        onPress={() => sendMessage()}
      >
        <Text>Send Message</Text>
      </Pressable>

      <Pressable
        style={styles.closeModalButton}
        onPress={() => hideModal()}
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