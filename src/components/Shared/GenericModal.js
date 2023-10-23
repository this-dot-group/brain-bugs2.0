import React from 'react';

import { Modal, StyleSheet, View, ScrollView } from 'react-native';
import { Views } from '../../styles';
import SafeViewAllDevices from './SafeViewAllDevices';

const getStyles = style =>  StyleSheet.create({
  modalView: {
    ...Views.modalView,
    ...style
  },
  disabledView: {
    height: '100%',
    widht: '100%',
    backgroundColor: 'rgba(0,0,0,.75)'
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
        <SafeViewAllDevices>
          <View style={props.disableBackground ? styles.disabledView : ''}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </SafeViewAllDevices>
      </ScrollView>
    </Modal>
  );
}

export default GenericModal;
