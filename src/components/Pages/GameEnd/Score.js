import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Trophy from './Trophy';
import { Typography } from '../../../styles';

function Score ({ name, score, isWinner, screenDeviceWidth }) {
  const styles = StyleSheet.create({
    score: {
      alignItems: 'center',
      marginHorizontal: 10,
      position: 'relative',
      paddingBottom: 60
    },
    scoreText: {
      ...Typography.headingTwoText[screenDeviceWidth]
    },
  })

  return (
    <View style={styles.score}>
      <Text style={styles.scoreText}>{name}</Text>
      <Text style={styles.scoreText}>{score}</Text>
      {isWinner && <Trophy />}
    </View>
  )
}

const mapStateToProps = state => ({
  screenDeviceWidth: state.userReducer.deviceWidth
});

export default connect(mapStateToProps)(Score)