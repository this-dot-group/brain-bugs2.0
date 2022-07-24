import React from 'react';

import { Modal, StyleSheet, View, ScrollView } from 'react-native';
import { Views } from '../../styles';

const getStyles = style =>  StyleSheet.create({
  root: {height: '100%', flex: 1},
  view: {
    ...Views.modalView,
    ...style
  },
  scrollView: {
    flex: 1,
    height: '100%'
  },
  safeView: {
    flex: 1
  },
});

function GenericModal(props) {
  const { children, style } = props;

  const styles = getStyles(style);

  return (
    <Modal  
      transparent={!(props.presentationStyle === 'fullScreen')}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
      {...props}
    >
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={styles.view}
        >
          {children}
        </View>
      </ScrollView>
    </Modal>
  );
}

export default GenericModal;