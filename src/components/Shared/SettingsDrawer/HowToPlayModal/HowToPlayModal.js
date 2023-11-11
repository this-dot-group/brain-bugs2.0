import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { GenericModal, TitleBar } from '../..';
import { instructions } from '../../../../../config';
import { Images, Typography } from '../../../../styles';



function HowToPlayModal({ visible, setVisible, deviceSize }) {

  const styles = StyleSheet.create({
    instructions: {
      alignSelf: 'center',
      paddingBottom: 30,
      width: '100%',
      paddingHorizontal: '15%',
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
    <GenericModal visible={visible} disableBackground>
      <TitleBar
        cb={handleClose}
        deviceSize={deviceSize}
      >
        How To Play
      </TitleBar>
      <ScrollView style={styles.instructions}>
        {instructions.map(({instruction, id}) => 
          <View key={id} style={styles.listItem}>
            <Image
              source={require('../../../../images/BRAIN_BUG2.png')}
              style={styles.bug}
            />
            <Text style={styles.listText}>{instruction}</Text>
          </View>
        )}
      </ScrollView>
    </GenericModal>
  )
}

export default HowToPlayModal
