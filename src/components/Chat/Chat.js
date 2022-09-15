import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Chat as ChatStyles } from '../../styles';
// import  from '../Shared';
import { TitleBar, PixelButton, StyledInput, KeyboardAvoidingComponent } from '../Shared';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
  },
  ...ChatStyles,
  content: {
    position: 'relative',
    flex: 1,
    paddingBottom: 50,
    height: '100%'
  },
  form: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%'
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
    backgroundColor: 'white'
  }
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
    if(!currMessage) return;
    socket.emit('messageSend', { gameCode, message: currMessage, ...user });
    setCurrMesssage('');
    textInputRef.current.clear();
    Keyboard.dismiss();
  }

  const hideModal = () => {
    socket.emit('messageSeen');
    setShowChat(false);
  }

  const handleInputPress = () => {
    scrollViewRef.current.scrollToEnd({ animated: true })
  }

  return (
    <View style={styles.root}>
      <TitleBar
        cb={hideModal}
      />
      <View style={styles.content}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          contentContainerStyle={{
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <KeyboardAvoidingComponent
            style={{flex: 0}}
            keyboardVerticalOffset={0}
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
          </KeyboardAvoidingComponent>
        </ScrollView>
        <KeyboardAvoidingComponent
          style={{
            position:'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white'
          }}
        >
          <ScrollView
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
          >
            <StyledInput
              multiline={true}
              onChangeText={value => setCurrMesssage(value)}
              onFocus={handleInputPress}
              ref={textInputRef}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              blurOnSubmit={true}
              style={styles.input}
            />
            <PixelButton
              buttonStyle={{ width: 100}}
              onPress={sendMessage}
            >
              <Text>
                Send
              </Text>
            </PixelButton>
          </ScrollView>
        </KeyboardAvoidingComponent>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  socket: state.socketReducer,
  socketId: state.userReducer.socketId,
})

export default connect(mapStateToProps)(Chat);