import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';

const getStyles = (
  buttonStyle,
  textStyle
) => {
  let {
    width = 216,
    height = 40,
    borderColor = 'black',
    backgroundColor = 'white',
    borderWidth = 4,
  } = buttonStyle;
  const sideborderheight = height - 4 * borderWidth;
  width -= (4 * borderWidth);
  delete buttonStyle.width;

  return StyleSheet.create({
    root: {
      position: 'relative',
      height,
      width,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
      borderColor,
      borderWidth,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      ...buttonStyle
    },
    sideBorders: {
      width: borderWidth,
      height: sideborderheight,
      backgroundColor: borderColor,
      position: 'absolute',
      top: borderWidth,
      left: borderWidth * -2
    },
    sideBorderRight: {
      left: width + borderWidth,
    },
    backgroundColorBar: {
      width: borderWidth,
      height: sideborderheight,
      backgroundColor: backgroundColor,
      position: 'absolute',
      top: borderWidth,
      left: borderWidth * -1
    },
    backgroundColorBarRight: {
      left: width,
    },
    cornerDots: {
      position: 'absolute',
      width: borderWidth,
      height: borderWidth,
      backgroundColor: borderColor,
      top: 0,
      left: borderWidth * -1,
    },
    topRightDot: {
      left: width
    },
    bottomRightDot: {
      left: width,
      top: sideborderheight + borderWidth,
    },
    bottomLeftDot : {
      top: sideborderheight + borderWidth,
    },
    textStyle
  });
}

function PixelButton({ onPress, children, buttonStyle = {}, textStyle = {}, variant }) {

  if(variant?.toLowerCase() === 'go') {
    if(!children) children = 'GO'
    buttonStyle = {
      backgroundColor: 'green',
      borderColor: 'green',
      width: 50,
      height: 50,
      ...buttonStyle
    }
    textStyle = {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      ...textStyle
    }
  }

  const styles = getStyles(buttonStyle, textStyle);

  return (
    <Pressable
      onPress={onPress}
      style={styles.root}
    >
      <Text style={styles.textStyle}>
        {children}
      </Text>

      <View style={styles.sideBorders}></View>
      <View style={{...styles.sideBorders, ...styles.sideBorderRight}}></View>
      <View style={styles.backgroundColorBar}></View>
      <View style={{...styles.backgroundColorBar, ...styles.backgroundColorBarRight}}></View>
      <View style={styles.cornerDots}></View>
      <View style={{...styles.cornerDots, ...styles.topRightDot}}></View>
      <View style={{...styles.cornerDots, ...styles.bottomRightDot}}></View>
      <View style={{...styles.cornerDots, ...styles.bottomLeftDot}}></View>
    </Pressable>
  )
}

export default PixelButton;