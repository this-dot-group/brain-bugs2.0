import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { GenericModal, TitleBar } from '../Shared';
import { instructions } from '../../../config';
import { Images, Typography } from '../../styles';



function HowToPlayModal({ visible, setVisible, deviceSize }) {

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
      ...Typography.normalText[deviceSize]
    },
    bug: {
      ...Images.bugBulletPoints[deviceSize]
    }
  })

  const handleClose = () => setVisible(false);

  return (
    <GenericModal visible={visible}>
      <TitleBar
        cb={handleClose}
        deviceSize={deviceSize}
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
