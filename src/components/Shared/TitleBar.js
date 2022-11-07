import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import PixelButton  from './PixelButton';


const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative'
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'VT323'
  },
  closeModalButton: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeModalButtonText: {
    fontWeight: 'bold',
  }
});

function TitleBar({ children, cb }) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
      <PixelButton
        buttonStyle={{
          width: 40,
          height: 40,
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        <Pressable
          style={styles.closeModalButton}
          onPress={cb}
        >
          <Text style={styles.closeModalButtonText}>X</Text>
        </Pressable>
      </PixelButton>
    </View>
  );
}

export default TitleBar;