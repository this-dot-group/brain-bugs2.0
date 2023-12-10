import React, { useRef, useEffect } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import bug from "../../../images/dragonfly-sprite.png";
import { useSafeArea } from "../../../hooks";

// TODO: this knows about one row of the existing spritesheet, which is 4 images
// TODO: this is the height and width of each individual bug
const BUG_SIZE = 70;
const WIDTH_DURATION = 6000;

const getHypotenuse = (pointOne, pointTwo) => {
  return Math.sqrt(
    (pointOne.left - pointTwo.left) ** 2 + (pointOne.top - pointTwo.top) ** 2
  );
};

const getAngle = (pointOne, pointTwo) => {
  const up = pointTwo.top < pointOne.top;
  const left = pointTwo.left < pointOne.left;
  const opposite = Math.abs(pointOne.top - pointTwo.top);
  const angle = Math.asin(opposite / getHypotenuse(pointOne, pointTwo));

  const angleDeg = ((angle * 180) / Math.PI) * (up ? -1 : 1);
  const flip = left;

  return { angleDeg, flip };
};

function CrawlingBug({ color }) {
  const { height, width } = useSafeArea();
  const xMax = width - BUG_SIZE;
  const yMax = height - BUG_SIZE;
  const positions = [];

  const styles = StyleSheet.create({
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: BUG_SIZE,
      height: BUG_SIZE,
      opacity: 0.4,
      overflow: "hidden",
    },
    innerRotation: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    image: {
      width: "700%", // TODO: this is 700 because there are 7 images across the widest part of the spritesheet, and each 70x70 image needs to be 100% 
      tintColor: color,
    },
  });

  // Get map of points for the bug to follow
  for (let i = 0; i < 100; i++) {
    positions.push({
      left: Math.random() * xMax,
      top: Math.random() * yMax,
    });
  }

  const xAnim = useRef(new Animated.Value(positions[0].left)).current;
  const yAnim = useRef(new Animated.Value(positions[0].top)).current;
  const angleAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;

  const steps = [];
  const angleInputRange = [];
  const angleOutputRange = [];
  const flipOutputRange = [];
  const imgSteps = [];

  for (let j = 0; j < positions.length; j++) {
    const nextIndex = (j + 1) % positions.length;
    const curr = positions[j];
    const next = positions[nextIndex];
    const { angleDeg, flip } = getAngle(curr, next);
    const distance = getHypotenuse(curr, next);
    const duration = (WIDTH_DURATION * distance) / xMax;

    angleInputRange.push(j);
    angleOutputRange.push(angleDeg + "deg");
    flipOutputRange.push(flip ? "180deg" : "0deg");

    const horizontalStep = Animated.timing(xAnim, {
      toValue: next.left,
      useNativeDriver: true,
      easing: Easing.linear,
      duration,
    });

    const verticalStep = Animated.timing(yAnim, {
      toValue: next.top,
      useNativeDriver: true,
      easing: Easing.linear,
      duration,
    });

    steps.push(Animated.parallel([horizontalStep, verticalStep]));

    steps.push(
      Animated.parallel([
        Animated.timing(angleAnim, {
          toValue: nextIndex,
          useNativeDriver: true,
          duration: 100,
        }),
        Animated.timing(flipAnim, {
          toValue: nextIndex,
          useNativeDriver: true,
          duration: 0,
        }),
      ])
    );
  }

  // TODO: change this for number of images I have
  for (let k = 0; k < 4; k++) {
    imgSteps.push(
      Animated.timing(imageAnim, {
        toValue: BUG_SIZE * k * -1,
        useNativeDriver: true,
        duration: 0,
      })
    );
    imgSteps.push(Animated.delay(50));
  }

  useEffect(() => {
    // Start path
    Animated.sequence([
      Animated.delay(1500),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 1,
        bounciness: 6,
      }),
      Animated.loop(Animated.sequence(steps)),
    ]).start();

    // Start wing flapping
    Animated.loop(Animated.sequence(imgSteps)).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.root,
        transform: [
          {
            translateX: xAnim,
          },
          {
            translateY: yAnim,
          },
          {
            scale: scaleAnim,
          },
          {
            perspective: 1000,
          },
        ],
      }}
    >
      <Animated.View
        style={{
          ...styles.innerRotation,
          transform: [
            {
              rotateY: flipAnim.interpolate({
                inputRange: angleInputRange,
                outputRange: flipOutputRange,
              }),
            },
            {
              rotateZ: angleAnim.interpolate({
                inputRange: angleInputRange,
                outputRange: angleOutputRange,
              }),
            },
          ],
        }}
      >
        <Animated.Image
          source={bug}
          style={{
            ...styles.image,
            transform: [
              {
                translateX: imageAnim,
              },
            ],
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}

export default CrawlingBug;
