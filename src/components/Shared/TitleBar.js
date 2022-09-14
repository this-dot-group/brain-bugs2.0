import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    marginBottom: scale(18),
    position: 'relative'
  },
  text: {
    textAlign: 'center',
    fontSize: scale(25),
    fontFamily: 'VT323'
  },
  closeModalButton: {
    height: scale(26),
    width: scale(26),
    borderRadius: scale(8),
    borderColor: 'black',
    borderWidth: 2,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
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