import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
const getStyles = style => StyleSheet.create({
  container: {
    flex: 1,
    ...style
  }
});

const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0

const KeyboardAvoidingComponent = (props) => {

  const { children, style } = props;

  const styles = getStyles(style)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
      {...props}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingComponent;