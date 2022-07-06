import React from 'react';

import { Modal, StyleSheet, View, ScrollView } from 'react-native';
import { Views } from '../../styles';

const styles = StyleSheet.create({
  view: {
    ...Views.modalView,
  },
  safeView: {
    flex: 1
  },
});

function GenericModal({ visible, children }) {
  return (
    <Modal  
      transparent={true}
      visible={visible}
      animationType="slide"
      supportedOrientations={['landscape']}
      propogateSwipe
    >
      <ScrollView>
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