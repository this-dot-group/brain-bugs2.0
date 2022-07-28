import React from 'react';

import { Text, Pressable, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'VT323'
  },
  closeModalButton: {
    height: 30,
    width: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  closeModalButtonText: {
    fontWeight: 'bold',
  }
});

function TitleBar({ children, cb }) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>

      <Pressable
        style={styles.closeModalButton}
        onPress={cb}
      >
        <Text style={styles.closeModalButtonText}>X</Text>
      </Pressable>

    </View>
  );
}

export default TitleBar;