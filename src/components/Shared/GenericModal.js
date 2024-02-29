import React from 'react';

import { Modal, StyleSheet, View, ScrollView } from 'react-native';
import { Views } from '../../styles';
import SafeViewAllDevices from './SafeViewAllDevices';
import { darkBackground } from '../../styles/colors';

const getStyles = style =>  StyleSheet.create({
  modalView: {
    ...Views.modalView,
    ...style
  },
  disabledView: {
    height: '100%',
    width: '100%',
    backgroundColor: `${darkBackground.hex}90`
  }
});

function GenericModal({ children, style, ...props }) {
  const styles = getStyles(style);

  return (
    <Modal  
      transparent={!(props.presentationStyle === 'fullScreen')}
      animationType="fade"
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
