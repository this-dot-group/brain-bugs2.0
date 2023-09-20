import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Text, Pressable, StyleSheet, Animated } from 'react-native';
import PixelButton from './PixelButton';
import { Typography } from '../../styles';
import { darkBackground } from '../../styles/colors';

function PixelPressable ({
  children,
  pressableProps,
  screenDeviceWidth,
  wrapperStyle,
  ...props
}) {
  const styles = StyleSheet.create({
    root: { ...wrapperStyle },
    pressable: {
      height: '100%',
      width: '100%',
    },
    innerText: {
      ...Typography.innerText[screenDeviceWidth]
    },
    goText: {
      ...Typography.goBtnInnerText[screenDeviceWidth],
    }
  });

  const scaleVal = useRef(new Animated.Value(1)).current;

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

  if (typeof children === 'string') {
    children = <Text style={props.variant?.toLowerCase() === 'go' ? styles.goText : styles.innerText}>{children}</Text>
  }

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: scaleVal
          }
        ],
        ...styles.root
      }}
    >
      <PixelButton {...props}>
        <Pressable
          style={styles.pressable}
          onPressIn={shrink}
          onPressOut={grow}
          hitSlop={12}
          {...pressableProps}
        >
          {children}
        </Pressable>
      </PixelButton>
    </Animated.View>
  )
}

const mapStateToProps = state => ({
  screenDeviceWidth: state.userReducer.deviceWidth
});

export default connect(mapStateToProps)(PixelPressable);