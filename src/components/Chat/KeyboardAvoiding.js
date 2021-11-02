import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';

const KeyboardAvoidingComponent = ({ children }) => {
  return (
    <KeyboardAvoidingView
      // try these options for android
      behavior={Platform.OS === 'ios' ? 'position' : ''}
      // behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      // behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      // behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default KeyboardAvoidingComponent;