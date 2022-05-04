import { useState, useEffect, PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { playSound, fadeOutSound } from './services/sound';

const Component = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#faf',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app or not!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const HomeScreen = () => {
  const fling = Gesture.Fling();
  fling.direction(Directions.LEFT | Directions.RIGHT).onEnd(() => playSound());
  return (
    <GestureDetector gesture={fling}>
      <Component />
    </GestureDetector>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
