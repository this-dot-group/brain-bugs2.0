import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toggleMute } from '../../store/soundsReducer';
import Hider from './Hider';

function MuteButton({ toggleMute, isMuted, styles }) {
  const btnStyles = StyleSheet.create({
    button: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    pressable: {
      position: 'relative',
      width: 20,
      height: 20,
    }
  })

  const scaleVal = useRef(new Animated.Value(1)).current;

  const handlePress = () => toggleMute();

  const scaleAnim = toValue => () => {
    Animated.spring(scaleVal, {
      toValue,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }

  const shrink = scaleAnim(.9);

  const grow = scaleAnim(1);

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: scaleVal
          },
        ],
        ...styles
      }}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={shrink}
        onPressOut={grow}
        style={btnStyles.pressable}
      >
        <Hider show={isMuted} style={btnStyles.button}>
          <Text>🔕</Text>
        </Hider>
        <Hider show={!isMuted} style={btnStyles.button}>
          <Text>🔔</Text>
        </Hider>
      </Pressable>
    </Animated.View>
  )
}

const mapStateToProps = ({ isMuted }) => ({ isMuted });

export default connect(mapStateToProps, { toggleMute })(MuteButton);