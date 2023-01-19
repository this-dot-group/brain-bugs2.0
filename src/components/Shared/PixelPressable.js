import React from 'react';
import { connect } from 'react-redux';
import { Text, Pressable, StyleSheet } from 'react-native';
import PixelButton from './PixelButton';
import { Typography } from '../../styles';

function PixelPressable ({
  children,
  pressableProps,
  screenDeviceWidth,
  ...props
}) {

  const styles = StyleSheet.create({
    pressable: {
      height: '100%',
      width: '100%',
    },
    innerText: {
      ...Typography.innerText[screenDeviceWidth]
    },
  });

  return (
    <PixelButton {...props}>
      <Pressable
        {...pressableProps}
        style={styles.pressable}
      >
        <Text
          style={styles.innerText}
        >
          {children}
        </Text>
      </Pressable>
    </PixelButton>
  )
}

const mapStateToProps = state => ({
  screenDeviceWidth: state.userReducer.deviceWidth
});

export default connect(mapStateToProps)(PixelPressable);