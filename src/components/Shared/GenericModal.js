import React from 'react';

import { Modal, StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
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
      <SafeAreaView
        style={styles.safeView}
      >
        <ScrollView>
          <View
            style={styles.view}
          >
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default GenericModal;