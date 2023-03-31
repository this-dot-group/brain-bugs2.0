import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { TitleBar, StyledInput, KeyboardAvoidingComponent, Hider, PixelPressable, Overlay } from '../Shared';
import Badge from './Badge';
import { Buttons, Typography } from '../../styles';
import { useKeyboard } from '../../hooks';

function Chat({ socket, gameCode, user, rematchPending, handleNo, handleYes, rematchText, deviceWidth }) {
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMesssage] = useState('');
  const [showChat, setShowChat] = useState(false);
  // capturing the time you open the modal, in theory
  const [latestTime, setLatestTime] = useState(Date.now());

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 50,
      paddingVertical: 20,
      zIndex: 2,
    },
    messagesContainer: {
      maxHeight: '100%',
      overflow: 'scroll',
      width: '100%',
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
    },
    form: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'flex-end',
      height: '100%',
      zIndex: 2
    },
    input: {
      ...Typography.chatInputText[deviceWidth],
      zIndex: 2
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

  const { keyboardActive, hideKeyboard } = useKeyboard();

  // TODO: something is happening with the way this component mounts. the messages.filter function is working correctly but the component will mount a couple times and cause it to steamroll the correct unread message count. works v sporadically (if you wait 10 seconds it works fine. why would that prevent a double remount?)
  
  // when is unseenMessages logging? 
  // do we even need useMemo?
  const unseenMessages = useMemo(() => 
    showChat ? 0 : messages.filter(({ timeStamp }) => timeStamp > latestTime).length,
  [messages, showChat, latestTime]);

  const scrollViewRef = useRef();
  const textInputRef = useRef();

  useEffect(() => {
    socket.on('newMessage', messageHandler);

    return () => {
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
    hideKeyboard();
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
        <Overlay
          active={keyboardActive}
          onPress={hideKeyboard}
        />
        <View style={styles.root} pointerEvents={'box-none'}>
          <View
            pointerEvents={!keyboardActive ? 'auto' : 'none'}
          >
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
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  socket: state.socketReducer,
})

export default connect(mapStateToProps)(Chat);