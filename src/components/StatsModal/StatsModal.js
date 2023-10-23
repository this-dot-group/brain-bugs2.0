import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { GenericModal, TitleBar } from '../Shared';
import { Typography } from '../../styles';

function StatsModal({ visible, setVisible, deviceSize, stats }) {
  const styles = StyleSheet.create({
    instructions: {
      alignSelf: 'center',
      width: '70%',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 'auto'
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
      <View style={styles.instructions}>
        {Object.values(stats).map(({ id, label, value}) => 
          <View style={styles.listItem} key={id}>
            <Text style={styles.listText}>{label}</Text>
            <Text style={styles.listText}>{value}</Text>
          </View>
        )}
      </View>
    </GenericModal>
  );
}

const mapStateToProps = state => ({
  stats: state.statsReducer,
});

export default connect(mapStateToProps)(StatsModal);
