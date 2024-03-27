import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, SharedValue } from 'react-native-reanimated';

interface BallProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  size: 'large' | 'small';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Ball({ x, y, size }: BallProps) {
  const ballSize = size === 'large' ? screenWidth * 0.3 : screenWidth * 0.1;
  const halfBallSize = ballSize / 2;

  // Use derived values to adjust for screen boundaries
  // so that we dont let the ball go past the edge
  const translateX = useDerivedValue(() => {
    let positionX = x.value * (screenWidth - ballSize);
    if (positionX < 0) positionX = 0;
    if (positionX > screenWidth - ballSize) positionX = screenWidth - ballSize;
    return positionX;
  });

  const translateY = useDerivedValue(() => {
    let positionY = y.value * (screenHeight - ballSize);
    if (positionY < 0) positionY = 0;
    if (positionY > screenHeight - ballSize) positionY = screenHeight - ballSize;
    return positionY;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      width: ballSize,
      height: ballSize,
      borderRadius: halfBallSize,
    };
  });

  return <Animated.View style={[styles.ball, animatedStyle]} />;
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    backgroundColor: '#90e133',
  },
});
