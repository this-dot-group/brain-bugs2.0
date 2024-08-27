import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { GenericModal, TitleBar } from '../..';
import { Typography } from '../../../../styles';

function StatsModal({ visible, setVisible, deviceSize, stats }) {
  const styles = StyleSheet.create({
    instructions: {
      alignSelf: 'center',
      width: '100%',
      paddingHorizontal: '15%',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 'auto',
      width: '100%',
    },
    listText: {
      ...Typography.normalText[deviceSize],
      paddingVertical: 4,
    },
  });

  const handleClose = () => setVisible(false);

  return (
    <GenericModal visible={visible} disableBackground>
      <TitleBar
        cb={handleClose}
        deviceSize={deviceSize}
      >
        Stats
      </TitleBar>
      <ScrollView style={styles.instructions}>
        {Object.values(stats).map(({ id, label, value}) => 
          <View style={styles.listItem} key={id}>
            <Text style={styles.listText}>{label}</Text>
            <Text style={styles.listText}>{value}</Text>
          </View>
        )}
      </ScrollView>
    </GenericModal>
  );
}

const mapStateToProps = state => ({
  stats: state.statsReducer,
});

export default connect(mapStateToProps)(StatsModal);
