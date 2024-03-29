import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet } from 'react-native';
import Hider from './Hider';

function ToggleButton({ toggle, isToggled, styles, untoggledText, toggledText }) {
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

  const handlePress = () => toggle();

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

  if (typeof toggledText === 'string') {
    toggledText = <Text>{toggledText}</Text>
  }

  if (typeof untoggledText === 'string') {
    untoggledText = <Text>{untoggledText}</Text>
  }

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
        hitSlop={10}
      >
        <Hider show={isToggled} style={btnStyles.button}>
          {toggledText}
        </Hider>
        <Hider show={!isToggled} style={btnStyles.button}>
          {untoggledText}
        </Hider>
      </Pressable>
    </Animated.View>
  )
}

export default ToggleButton;