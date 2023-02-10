import { View, Text, StyleSheet, ScrollView, Keyboard, Modal } from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { TitleBar, StyledInput, KeyboardAvoidingComponent, Hider, PixelPressable } from '../Shared';
import Badge from './Badge';
import Overlay from './Overlay';
import { Buttons, Typography } from '../../styles';

function Chat({ socket, gameCode, user, rematchPending, handleNo, handleYes, rematchText, deviceWidth }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [latestTime, setLatestTime] = useState(Date.now());

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
      ...Typography.normalText[deviceWidth],
      alignSelf: 'flex-end',
      backgroundColor: 'green',
      color: '#fff',
      borderRadius: 10,
      paddingHorizontal: 8,
      overflow: 'hidden',
      marginBottom: 2,
      maxWidth: '50%'
    },
    opponentMessages : {
      ...Typography.normalText[deviceWidth],
      alignSelf: 'flex-start',
      backgroundColor: 'blue',
    },
    content: {
      position: 'relative',
      flex: 1,
      paddingBottom: 50,
      height: '100%',
      backgroundColor: 'white'
    },
    form: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'flex-end',
      height: '100%',
      zIndex: 4
    },
    input: {
      ...Typography.chatInputText[deviceWidth],
    },
    innerRematchText: {
      ...Typography.rematchText[deviceWidth],
      color: 'red',
      marginTop: 'auto',
      marginBottom: 'auto',
      textAlign: 'center'
    },
    rematchHeadingText: {
      ...Typography.rematchText[deviceWidth],
      marginTop: 'auto',
      marginBottom: 'auto',
      textAlign: 'center'
    },
    chatModalStyles: {
      backgroundColor: 'black'
    },
    yesNoButtonCont: {
      display: 'flex',
      marginRight: 0,
      flexDirection: 'row',
      alignContent: 'center',
    },
    gap: {
      marginHorizontal: 6,
      alignItems: 'center',
    },
    showChatBtn: {
      ...Buttons.howToPlayBtn[deviceWidth]
    },
    howToPlayBtn: {
      ...Buttons.howToPlayBtn[deviceWidth],
      width: 80,
      zIndex: 1
    }
  })

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
        <PixelPressable
          buttonStyle={styles.showChatBtn}
          pressableProps={{ onPress: showModal }}
        >
          Show Chat
        </PixelPressable>
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
            style={{ marginBottom: 0 }}
          >
            <Hider
              show={rematchPending}
            >
              <View style={styles.yesNoButtonCont}>
                <View style={styles.gap}>
                  <Text style={styles.rematchHeadingText}>{rematchText}</Text>
                </View>
                <View style={styles.gap}>
                  <PixelPressable
                    buttonStyle={{width: 60, marginBottom: 10 }}
                    pressableProps={{ onPress: handleYes }}
                  >
                    <Text style={styles.innerRematchText}>Yes</Text>
                  </PixelPressable>
                </View>
                <View style={styles.gap}>
                  <PixelPressable
                    buttonStyle={{width: 60, marginBottom: 10 }}
                    pressableProps={{ onPress: handleNo }}
                  >
                    <Text style={styles.innerRematchText}>No</Text>
                  </PixelPressable>
                </View>
              </View>
            </Hider>
          </TitleBar>

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
              keyboardVerticalOffset={95}
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
                <PixelPressable
                  buttonStyle={styles.howToPlayBtn}
                  pressableProps={{ onPress: sendMessage }}
                >
                  Send
                </PixelPressable>
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