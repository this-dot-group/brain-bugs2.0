import React from 'react';

import { Modal, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Views } from '../../styles';

const getStyles = style =>  StyleSheet.create({
  modalView: {
    ...Views.modalView,
    ...style
  },
});

function GenericModal({ children, style, ...props }) {
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
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView>
          <View style={styles.modalView}>{children}</View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
}

export default GenericModal;
