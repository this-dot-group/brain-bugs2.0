import { View, Text, StyleSheet, ScrollView, Keyboard, Pressable, Modal } from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { TitleBar, PixelButton, StyledInput, KeyboardAvoidingComponent, Hider } from '../Shared';
import Badge from './Badge';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
    zIndex: 1,
  },
  messagesContainer: {
    maxHeight: '100%',
    overflow: 'scroll',
    width: '100%',
    backgroundColor: 'white'
  },
  messages: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
    marginBottom: 2,
    fontSize: 18,
  },
  opponentMessages : {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
  },
  content: {
    position: 'relative',
    flex: 1,
    marginTop: 6,
    paddingTop: 10,
    paddingBottom: 50,
    height: '100%',
    backgroundColor: 'white'
  },
  form: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '100%',
    zIndex: 4
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
    backgroundColor: 'white',
    zIndex: 2,
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'DotGothic'
  },
  innerText: {
    fontFamily: 'DotGothic',
    fontSize: 12,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  },
  chatModalStyles: {
    backgroundColor: 'black'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    zIndex: 1,
  }
})

function Overlay ({ active }) {
  return (
    <Hider
      show={active}
      style={styles.overlay}
      pointerEvents='none'
    />
  )
}

function Chat({ socket, gameCode, user }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [latestTime, setLatestTime] = useState(Date.now());

  const unseenMessages = useMemo(() => 
    showChat ? 0 : messages.filter(({ timeStamp }) => timeStamp > latestTime).length,
  [messages, showChat, latestTime]);

  const scrollViewRef = useRef();
  const textInputRef = useRef();

  useEffect(() => {
    socket.on('newMessage', messageHandler);
    const keyboardShowing = Keyboard.addListener('keyboardWillShow', () => setKeyboardActive(true));
    const keyboardhiding = Keyboard.addListener('keyboardWillHide', () => setKeyboardActive(false));

    return () => {
      keyboardShowing.remove();
      keyboardhiding.remove();
      socket.off('newMessage', messageHandler);
    }
  }, [])
  
  const messageHandler = updatedMessages => {
    setMessages(updatedMessages);
  }

  const sendMessage = () => {
    if(!currMessage) return;
    socket.emit('messageSend', { gameCode, message: currMessage, ...user });
    setCurrMesssage('');
    textInputRef.current.clear();
    Keyboard.dismiss();
  }

  const hideModal = () => {
    setShowChat(false);
    setLatestTime(Date.now())
  }
  
  const showModal = () => setShowChat(true);

  return (
    <>
      <View style={styles.showChatWrapper}>
        <PixelButton>
          <Pressable onPress={showModal} style={{height: '100%', width: '100%', position: 'relative'}}>
            <Text style={styles.innerText}>Show Chat</Text>
          </Pressable>
        </PixelButton>
        {!!unseenMessages && <Badge number={unseenMessages} />}
      </View>
      <Modal
        visible={showChat}
        presentationStyle="fullScreen"
        supportedOrientations={['landscape']}
        style={styles.chatModalStyles}
      >
        <Overlay active={keyboardActive} />
        <View style={styles.root}>

          <TitleBar
            cb={hideModal}
          />
          <View style={styles.content}>
            <Overlay active={keyboardActive} />
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              contentContainerStyle={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}
              scrollEnabled={!keyboardActive}
            >
              <View
                style={{flex: 0 }}
              >
                {messages.map(({ message, userId, timeStamp }) =>
                  <Text
                    key={timeStamp}
                    style={
                      userId === socket.id
                        ? {...styles.messages}
                        : {...styles.messages, ...styles.opponentMessages}
                    }
                  >{message}</Text>
                )}
              </View>
            </ScrollView>
            <KeyboardAvoidingComponent
              keyboardVerticalOffset={70}
              style={{
                position:'absolute',
                bottom: 0,
                width: '100%',
                zIndex: 1
              }}
            >
              <ScrollView
                contentContainerStyle={styles.form}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={false}
              >
                <StyledInput
                  multiline={true}
                  onChangeText={value => setCurrMesssage(value)}
                  ref={textInputRef}
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                  blurOnSubmit={true}
                  style={styles.input}
                />
                <PixelButton
                  buttonStyle={{ width: 100, zIndex: 1 }}
                >
                  <Pressable onPress={sendMessage} style={styles.button}>
                    <Text style={styles.buttonText}>
                      Send
                    </Text>
                  </Pressable>
                </PixelButton>
              </ScrollView>
            </KeyboardAvoidingComponent>
          </View>
        </View>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  socket: state.socketReducer,
})

export default connect(mapStateToProps)(Chat);