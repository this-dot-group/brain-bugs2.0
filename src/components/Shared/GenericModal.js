import React from 'react';

import { Modal, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Views } from '../../styles';

const getStyles = style =>  StyleSheet.create({
  modalView: {
    ...Views.modalView,
    ...style
  },
  disabledView: {
    height: '100%',
    widht: '100%',
    backgroundColor: 'rgba(35,47,36,0.8)'
  }
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
          <View style={props.disableBackground ? styles.disabledView : ''}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
}

export default GenericModal;
