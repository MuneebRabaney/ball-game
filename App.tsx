import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { useSharedValue } from 'react-native-reanimated';
import Ball from './Ball';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [size, setSize] = useState<'large' | 'small'>('large');
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(16);

    const subscription = DeviceMotion.addListener(({ rotation }) => {
      // Normalize the rotation values
      // ensuring the ball can use the full screen
      x.value = rotation.gamma;
      y.value = rotation.beta;
    });

    return () => subscription.remove();
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title='Toggle ball size' onPress={() => setSize(size === 'large' ? 'small' : 'large')} />
      </View>
      <Ball x={x} y={y} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    height: screenHeight,
    width: screenWidth,
  },
  buttonContainer: {
    position: 'absolute',
    top: screenHeight / 2 - 50,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
