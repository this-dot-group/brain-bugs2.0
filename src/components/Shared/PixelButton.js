import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 40;
const BORDER_WIDTH =  4;
const SIDEBORDER_HEIGHT = BUTTON_HEIGHT - 4 * BORDER_WIDTH;
const BUTTON_WIDTH_SMALL = BUTTON_HEIGHT;
const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = 'black';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  rootSmall: {
    width: BUTTON_WIDTH_SMALL
  },
  sideBorders: {
    width: BORDER_WIDTH,
    height: SIDEBORDER_HEIGHT,
    backgroundColor: BORDER_COLOR,
    position: 'absolute',
    top: BORDER_WIDTH,
    left: BORDER_WIDTH * -2
  },
  sideBorderRight: {
    left: BUTTON_WIDTH + BORDER_WIDTH,
  },
  sideBorderRightSmall: {
    left: BUTTON_WIDTH_SMALL + BORDER_WIDTH,
  },
  backgroundColorBar: {
    width: BORDER_WIDTH,
    height: SIDEBORDER_HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
    position: 'absolute',
    top: BORDER_WIDTH,
    left: BORDER_WIDTH * -1
  },
  backgroundColorBarRight: {
    left: BUTTON_WIDTH,
  },
  backgroundColorBarRightSmall: {
    left: BUTTON_WIDTH_SMALL,
  },
  cornerDots: {
    position: 'absolute',
    width: BORDER_WIDTH,
    height: BORDER_WIDTH,
    backgroundColor: BORDER_COLOR,
    top: 0,
    left: BORDER_WIDTH * -1,
  },
  topRightDot: {
    left: BUTTON_WIDTH
  },
  bottomRightDot: {
    left: BUTTON_WIDTH,
    top: SIDEBORDER_HEIGHT + BORDER_WIDTH,
  },
  dotSmall: {
    left: BUTTON_WIDTH_SMALL,
  },
  bottomLeftDot : {
    top: SIDEBORDER_HEIGHT + BORDER_WIDTH,
  }
});
// Param small is a bool
function PixelButton({ onPress, children, style, small }) {
  let rootStyles = { ...styles.root };
  let sideBorderRightStyles = { ...styles.sideBorders, ...styles.sideBorderRight };
  let backgroundColorBarRightStyles = { ...styles.backgroundColorBar, ...styles.backgroundColorBarRight }
  let topRightDotStyles = { ...styles.cornerDots, ...styles.topRightDot }
  let bottomRightDotStyles = { ...styles.cornerDots, ...styles.bottomRightDot }

  if(small) {
    rootStyles = { ...rootStyles, ...styles.rootSmall };
    sideBorderRightStyles = { ...sideBorderRightStyles, ...styles.sideBorderRightSmall };
    backgroundColorBarRightStyles = { ...backgroundColorBarRightStyles, ...styles.backgroundColorBarRightSmall }
    topRightDotStyles = { ...topRightDotStyles, ...styles.dotSmall}
    bottomRightDotStyles = { ...bottomRightDotStyles, ...styles.dotSmall }
  }
  return (
    <Pressable
      onPress={onPress}
      style={{...rootStyles, ...style}}
    >
      {children}
      <View style={styles.sideBorders}></View>
      <View style={sideBorderRightStyles}></View>
      <View style={styles.backgroundColorBar}></View>
      <View style={backgroundColorBarRightStyles}></View>
      <View style={styles.cornerDots}></View>
      <View style={topRightDotStyles}></View>
      <View style={bottomRightDotStyles}></View>
      <View style={{...styles.cornerDots, ...styles.bottomLeftDot}}></View>
    </Pressable>
  )
}

export default PixelButton;