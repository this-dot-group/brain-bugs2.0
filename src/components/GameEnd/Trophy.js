import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Animated, Easing, Image, StyleSheet } from 'react-native';
import { Images } from '../../styles';


function Trophy({ screenDeviceWidth }) {
  const styles = StyleSheet.create({
    container: {
      ...Images.trophyCont[screenDeviceWidth]
    },
    trophy: {
      ...Images.gameEndTrophy[screenDeviceWidth]
    },
  });

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(shakeAnim, {
      toValue: 1,
      duration: 1600,
      easing: Easing.linear,
      useNativeDriver: true,
    })).start();
  }, [])

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          {
            rotateZ: shakeAnim.interpolate({
              inputRange: [0, .6, .7, .8, .85, .9, .94, .98, 1],
              outputRange: ['0deg', '0deg', '10deg', '-10deg', '10deg', '-10deg', '10deg', '-10deg','0deg']
            }),
          },
        ]
      }}
    >
      <Image
        source={require('../../images/trophy.png')}
        style={styles.trophy}
      />
    </Animated.View>
  )
}

const mapStateToProps = state => ({
  screenDeviceWidth: state.userReducer.deviceWidth
});

export default connect(mapStateToProps)(Trophy);