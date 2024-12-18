import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import {
  StyledInput,
  KeyboardAvoidingComponent,
  PixelPressable,
  Overlay,
  SafeViewAllDevices,
} from '../../../Shared';
import Badge from './Badge';
import { Buttons, Typography } from '../../../../styles';
import { useKeyboard } from '../../../../hooks';
import { darkBackground, blue, yellow, black } from '../../../../styles/colors';
import CloseModalButton from '../../../Shared/CloseModalButton';
import { playSound } from '../../../../store/soundsReducer';

const id = uuid.v4();

function Chat({
  socket,
  gameCode,
  user,
  quickHide,
  deviceWidth,
  playSound
}) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');
  const [showChat, setShowChat] = useState(false);
  // capturing the time you open the modal, in theory. originally set here but very quickly updated via server event roundtrip (need Date.now() to come from one source of truth, the server, not the individual client)
  const [latestTime, setLatestTime] = useState(Date.now());

  const styles = StyleSheet.create({
    modalInner: {
      backgroundColor: darkBackground.hex,
      height: '100%',
      width: '100%',
      padding: 20,
      zIndex: 2,
    },
    safeArea: {
      flex: 1,
      height: '100%',
      backgroundColor: black.hex,
      position: 'relative',
    },
    messagesContainer: {
      maxHeight: '100%',
      overflow: 'scroll',
      width: '100%',
    },
    messages: {
      ...Typography.normalText[deviceWidth],
      alignSelf: 'flex-end',
      backgroundColor: yellow.hex,
      color: darkBackground.hex,
      borderRadius: 10,
      paddingHorizontal: 8,
      overflow: 'hidden',
      marginBottom: 8,
      maxWidth: '60%'
    },
    opponentMessages : {
      ...Typography.normalText[deviceWidth],
      alignSelf: 'flex-start',
      backgroundColor: blue.hex,
    },
    content: {
      position: 'relative',
      flex: 1,
      paddingBottom: 50,
      height: '100%',
      zIndex: 3
    },
    contentInner: {
      flex: 0
    },
    form: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      height: '100%',
      zIndex: 2
    },
    input: {
      ...Typography.chatInputText[deviceWidth],
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 2
    },
    chatModalStyles: {
      backgroundColor: black.hex,
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

  const { keyboardActive, hideKeyboard } = useKeyboard();

  const unseenMessages = showChat ? 0 : messages.filter(({ timeStamp }) => timeStamp > latestTime).length;

  const scrollViewRef = useRef();
  const textInputRef = useRef();

  useEffect(() => {
    socket.emit('getFirstLatestTime', id);
    socket.on('setFirstLatestTime', latestTimeHandler);
    socket.on('newMessage', messageHandler);

    return () => {
      socket.off('setFirstLatestTime', latestTimeHandler);
      socket.off('newMessage', messageHandler);
    }
  }, [])

  useEffect(() => {
    if(quickHide) {
      setShowChat(false)
      setLatestTime(Date.now());
      socket.emit('setUserLatestTime', id);
    }
  }, [quickHide])

  const latestTimeHandler = latestTimeObj => {
    if(id in latestTimeObj) {
      setLatestTime(latestTimeObj[id]);
    }
  }
  
  const messageHandler = updatedChatObj => {
    const lastMessage = updatedChatObj.messages.at(-1);
    if (lastMessage.userId !== id) {
      playSound('positiveTone');
    }

    setLatestTime(updatedChatObj.latestTime[id]);
    setMessages(updatedChatObj.messages);
  }

  const sendMessage = () => {
    if(!currMessage) return;
    socket.emit('messageSend', {
      gameCode,
      message: currMessage,
      ...user,
      socket: id,
    });
    setCurrMesssage('');
    textInputRef.current.clear();
    hideKeyboard();
  }

  const hideModal = () => {
    setShowChat(false);
    setLatestTime(Date.now());
    socket.emit('setUserLatestTime', id);
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
        animationType='fade'
        style={styles.chatModalStyles}
      >
        <SafeViewAllDevices style={styles.safeArea} pointerEvents={'box-none'}>
          <View style={styles.modalInner}>
            <Overlay
              active={keyboardActive}
              onPress={hideKeyboard}
            />

            <View
              pointerEvents={!keyboardActive ? 'auto' : 'none'}
              style={{display: "flex", marginBottom: 8}}
            >
              <CloseModalButton 
                cb={hideModal} 
                wrapperStyle={{
                  alignSelf: "flex-end" 
                }}
              />
            </View>

            <View style={styles.content}>
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                contentContainerStyle={{
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                }}
                scrollEnabled={!keyboardActive}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={styles.contentInner}
                >
                  {messages.map(({ message, userId, timeStamp }) =>
                    <Text
                      key={timeStamp}
                      style={
                        userId === id
                          ? {...styles.messages}
                          : {...styles.messages, ...styles.opponentMessages}
                      }
                    >{message}</Text>
                  )}
                </View>
              </ScrollView>
              <KeyboardAvoidingComponent
                keyboardVerticalOffset={80}
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
        </SafeViewAllDevices>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  socket: state.socketReducer
})

export default connect(mapStateToProps, { playSound })(Chat);