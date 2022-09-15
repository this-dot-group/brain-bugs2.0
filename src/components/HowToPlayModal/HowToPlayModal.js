import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GenericModal, TitleBar } from '../Shared';
import { instructions } from '../../../config';

const styles = StyleSheet.create({
  instructions: {
    alignSelf: 'center',
    paddingBottom: 30
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontFamily: 'DotGothic',
    paddingVertical: 4
  },
  bug: {
    width: 20,
    height: 20,
    marginRight: 10
  }
})

function HowToPlayModal({ visible, setVisible }) {

  const handleClose = () => setVisible(false);

  return (
    <GenericModal visible={visible}>
      <TitleBar
        cb={handleClose}
      >
        How To Play
      </TitleBar>
      <View style={styles.instructions}>
        {instructions.map(({instruction, id}) => 
          <View key={id} style={styles.listItem}>
            <Image
              source={require('../../images/BRAIN_BUG1.png')}
              style={styles.bug}
            />
            <Text style={styles.listText}>{instruction}</Text>
          </View>
        )}
      </View>
    </GenericModal>
  )
}

export default HowToPlayModal
