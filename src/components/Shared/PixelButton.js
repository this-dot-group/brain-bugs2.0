import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brightGreen, darkBackground } from '../../styles/colors';

const getStyles = (
  buttonStyle,
  textStyle,
) => {
  let {
    width = 216,
    height = 40,
    borderColor = brightGreen.hex,
    backgroundColor = darkBackground.hex,
    borderWidth = 4,
    marginLeft = 0,
    marginRight = 0,
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
      marginRight: marginRight + borderWidth * 2,
      marginLeft: marginLeft + borderWidth * 2,
      ...buttonStyle,
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
      left: (buttonStyle.width || width) + borderWidth
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
      left: buttonStyle.width || width,

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
      left: buttonStyle.width || width,
    },
    bottomRightDot: {
      left: buttonStyle.width || width,
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
      height: 46,
      ...buttonStyle
    }
    textStyle = {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'DotGothic',
      fontSize: 16,
      ...textStyle
    }
  }

  const styles = getStyles(buttonStyle, textStyle);

  return (
    <View style={styles.root}>

        {children}

      <View style={styles.sideBorders}></View>
      <View style={{...styles.sideBorders, ...styles.sideBorderRight}}></View>
      <View style={styles.backgroundColorBar}></View>
      <View style={{...styles.backgroundColorBar, ...styles.backgroundColorBarRight}}></View>
      <View style={styles.cornerDots}></View>
      <View style={{...styles.cornerDots, ...styles.topRightDot}}></View>
      <View style={{...styles.cornerDots, ...styles.bottomRightDot}}></View>
      <View style={{...styles.cornerDots, ...styles.bottomLeftDot}}></View>

    </View>
  )
}

export default PixelButton;