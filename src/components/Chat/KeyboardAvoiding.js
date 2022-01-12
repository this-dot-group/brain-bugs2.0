import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';

const KeyboardAvoidingComponent = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
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