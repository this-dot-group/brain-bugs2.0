import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';

const getStyles = style => StyleSheet.create({
  container: {
    flex: 1,
    ...style
  }
});

const KeyboardAvoidingComponent = (props) => {
  const { children, style, offset } = props;

  const keyboardVerticalOffset = Platform.OS === 'ios' ? offset ?? 70 : 0;

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