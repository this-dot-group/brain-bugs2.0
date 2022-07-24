import React from 'react';

import { Text, Pressable, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
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
    position: 'absolute',
    top: 0,
    right: 0,
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