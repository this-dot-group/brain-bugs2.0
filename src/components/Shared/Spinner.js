import React, { useRef, useEffect } from 'react';
import { Image, View, StyleSheet, Animated, Easing } from 'react-native';

const SIZE = 125;
const BUG_SIZE = 20;
const NUM_BUGS = 12;
const bugs = {};
const bugTemplate = {
  position: 'absolute',
  height: BUG_SIZE,
  width: BUG_SIZE,
}

// Calculates placement in circle around center of parent box without overlapping the box
// pos = center + radius * sin/cos(angle)
const getPos = (func, i) => SIZE / 2 + (SIZE - BUG_SIZE - 2) / 2 * Math[func](i / NUM_BUGS * 2 * Math.PI) - BUG_SIZE / 2;

for (let i = 0; i < NUM_BUGS; i++) {
  bugs[`bug-${i}`] = {
    ...bugTemplate,
    top: getPos('cos', i),
    left: getPos('sin', i),
    // If we change image, may need to change 270
    transform: [{ rotateZ: `${i % NUM_BUGS * 360 / NUM_BUGS * -1 + 270}deg` }],
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: SIZE,
    height: SIZE,
  },
  spinCont: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZE,
    height: SIZE,
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE
  },
  ...bugs
});

function Spinner ({ children }) {

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    })).start();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {children}
      </View>
      <Animated.View
        style={{transform: [
          {translateY: SIZE/2 },
          {
            rotateZ: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          },
          {translateY: -SIZE /2},
        ]}}
      >
        <View style={styles.spinCont}>
          {Object.keys(bugs).map(bug => 
            <Image
              key={bug}
              source={require('../../images/BRAIN_BUG1.png')}
              style={styles[bug]}
            />
          )}
        </View>
      </Animated.View>
    </View>
  )
}

export default Spinner;